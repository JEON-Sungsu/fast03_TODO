import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { runPracticeDayjs } from './src/practice-dayjs';
import Util, { getCalendarColumns } from './src/Util';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const columnSize = 30;

export default function App() {
    const now = dayjs();
    const columns = getCalendarColumns(now);

    //item: date 는 하단의 FlatList 의 data 이름인 columns 의 각 배열들을 새로 명명한거임. 별거아님.
    const renderItem = ({ item: date }) => {
        const dateText = dayjs(date).get('date');
        const day = dayjs(date).get('day');
        const color = day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
        const isCurrentMonth = dayjs(date).isSame(now, 'month');
        return (
            <View
                style={{
                    width: columnSize,
                    height: columnSize,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{ color: color, opacity: isCurrentMonth ? 1 : 0.3 }}
                >
                    {dateText}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={columns} renderItem={renderItem} numColumns={7} />
        </SafeAreaView>
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
