import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';

import Margin from './Margin';
import { getDayColor, getDayText } from './Util';

const columnSize = 30;

const Column = ({
    text,
    color,
    opacity,
    disabled,
    onPress,
    isSelected,
    hasTodo,
}) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
                width: columnSize,
                height: columnSize,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
                borderRadius: columnSize / 2,
            }}
        >
            <Text style={{ color: color, opacity: opacity }}>{text}</Text>
        </TouchableOpacity>
    );
};

const ArrowButton = ({ name, size, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 15 }}>
            <SimpleLineIcons name={name} size={size} color="#404040" />
        </TouchableOpacity>
    );
};

export default ({
    selectedDate,
    onPressLeftArrow,
    onPressRightArrow,
    onPressHeaderDate,
    onPressDate,
    columns,
}) => {
    const ListHeaderComponent = () => {
        const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD.');
        return (
            <View key={'header'}>
                <Margin height={15} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ArrowButton
                        name={'arrow-left'}
                        size={15}
                        onPress={onPressLeftArrow}
                    />
                    <TouchableOpacity onPress={onPressHeaderDate}>
                        <Text style={{ fontSize: 20, color: '#404040' }}>
                            {currentDateText}
                        </Text>
                    </TouchableOpacity>
                    <ArrowButton
                        name={'arrow-right'}
                        size={15}
                        onPress={onPressRightArrow}
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                        const dayText = getDayText(day);
                        const dayColor = getDayColor(day);
                        return (
                            <Column
                                disabled={true}
                                text={dayText}
                                color={dayColor}
                                opacity={1}
                            />
                        );
                    })}
                </View>
            </View>
        );
    };

    //item: date 는 하단의 FlatList 의 data 이름인 columns 의 각 배열들을 새로 명명한거임. 별거아님.
    const renderItem = ({ item: date }) => {
        const dateText = dayjs(date).get('date');
        const day = dayjs(date).get('day');
        const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
        const onPress = () => {
            onPressDate(date);
        };
        const isSelected = dayjs(date).isSame(selectedDate, 'date');
        return (
            <Column
                text={dateText}
                color={getDayColor(day)}
                opacity={isCurrentMonth ? 1 : 0.3}
                onPress={onPress}
                isSelected={isSelected}
            />
        );
    };

    return (
        <FlatList
            scrollEnable={false}
            data={columns}
            keyExtractor={(_, index) => `column-${index}`}
            renderItem={renderItem}
            numColumns={7}
            ListHeaderComponent={ListHeaderComponent}
        />
    );
};
