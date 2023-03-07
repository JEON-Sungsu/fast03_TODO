import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { bottomSpace, ITEM_WIDTH } from './Util';
import { AntDesign } from '@expo/vector-icons';

export default ({
    onChangeText,
    value,
    placeholder,
    onPressAdd,
    onSubmitEditing,
    onFocus,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: ITEM_WIDTH,
                alignItems: 'center',
                alignSelf: 'center',
            }}
        >
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 5 }}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={false}
                onFocus={onFocus}
            />
            <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
                <AntDesign name="plus" size={18} color="#595959" />
            </TouchableOpacity>
        </View>
    );
};
