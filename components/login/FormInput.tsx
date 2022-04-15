// Imports
// React Native:
import { StyleSheet, View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors, DEVICE_WIDTH, GlobalStyles } from '../styles/GlobalStyles';

export default function FormInput({ label, placeholderText, icon, ...rest }) {
    return(
        <View style={[styles.container]}>
            <View>
               <MaterialIcon name={icon} size={28} color={Colors.MAIN_ORANGE} />
            </View>
            <TextInput
                value={label}
                style={styles.inputStyle}
                numberOfLines={1}
                placeholder={placeholderText}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        width: DEVICE_WIDTH-60,
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    iconStyle: {

    },
    inputStyle: {
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        flex: 1,
        lineHeight: 20,
        marginLeft: 10,
    }
})
