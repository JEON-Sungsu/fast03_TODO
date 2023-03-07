import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Keyboard,
    Alert,
} from 'react-native';
import { useRef } from 'react';
import { runPracticeDayjs } from './src/practice-dayjs';
import Util, {
    getCalendarColumns,
    statusBarHeight,
    bottomSpace,
    ITEM_WIDTH,
} from './src/Util';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useCalendar } from './src/hook/UseCalendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import { Ionicons } from '@expo/vector-icons';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function App() {
    const now = dayjs();
    const {
        selectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        subtract1Month,
        add1Month,
        setSelectedDate,
    } = useCalendar(now);

    const {
        filteredTodoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput,
        resetInput,
    } = useTodoList(selectedDate);

    const flatListRef = useRef(null);
    const columns = getCalendarColumns(selectedDate);
    const onPressLeftArrow = subtract1Month;
    const onPressRightArrow = add1Month;
    const onPressHeaderDate = showDatePicker;
    const onPressDate = setSelectedDate;

    const ListHeaderComponent = () => {
        return (
            <View>
                <Calendar
                    columns={columns}
                    selectedDate={selectedDate}
                    onPressLeftArrow={onPressLeftArrow}
                    onPressRightArrow={onPressRightArrow}
                    onPressHeaderDate={onPressHeaderDate}
                    onPressDate={onPressDate}
                />
                <Margin height={15} />
                <View
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: 10 / 2,
                        backgroundColor: '#a3a3a3',
                        alignSelf: 'center',
                    }}
                />
                <Margin height={15} />
            </View>
        );
    };

    const renderItem = ({ item: todo }) => {
        const isSuccess = todo.isSuccess;
        const onPress = () => toggleTodo(todo.id);
        const onLongPress = () => {
            Alert.alert('삭제하시겠어요?', '', [
                {
                    style: 'cancle',
                    text: '아니요',
                },
                {
                    text: '네',
                    onPress: () => removeTodo(todo.id),
                },
            ]);
        };
        return (
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                    width: ITEM_WIDTH,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderBottomWidth: 0.2,
                    color: '#a6a6a6',
                    flexDirection: 'row',
                }}
            >
                <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>
                    {todo.content}
                </Text>
                <Ionicons
                    name="ios-checkmark"
                    size={17}
                    color={isSuccess ? '#595959' : '#bfbfbf'}
                />
            </Pressable>
        );
    };

    const scrollToEnd = () => {
        setTimeout(() => {
            flatListRef.current?.scrollToEnd();
        }, 100);
    };

    const onPressAdd = () => {
        addTodo();
        resetInput();
        scrollToEnd();
    };

    const onSubmitEditing = () => {
        addTodo();
        resetInput();
        scrollToEnd();
    };

    const onFocus = () => {
        scrollToEnd();
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <Image
                source={{
                    uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View>
                    <FlatList
                        data={filteredTodoList}
                        ref={flatListRef}
                        contentContainerStyle={{
                            paddingTop: statusBarHeight + 30,
                        }}
                        renderItem={renderItem}
                        ListHeaderComponent={ListHeaderComponent}
                        showsVerticalScrollIndicator={false}
                    />

                    <AddTodoInput
                        value={input}
                        onChangeText={setInput}
                        onPressAdd={onPressAdd}
                        placeholder={`${dayjs(selectedDate).format(
                            'M.D'
                        )} 일에 추가할 투두`}
                        onSubmitEditing={onSubmitEditing}
                        onFocus={onFocus}
                    />
                </View>
            </KeyboardAvoidingView>

            <Margin height={bottomSpace} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
