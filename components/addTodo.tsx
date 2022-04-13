import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export default function AddTodo() {
    const [text, setText] = useState("");

    const changeHandler = (val) => {
        setText(val)
        console.log(text)
    };

    return (
        <View style={styles.inputContainer}>
            {/* <TextInput 
                placeholder='Add New Item'
                onChangeText={changeHandler}
                style={styles.input}
            />
            <TouchableOpacity onPress={() => console.log("Hi")}>
                <Icon name="plus" size={15} color="#fff" style={styles.add} />
            </TouchableOpacity> */}
            <BottomSheetTextInput />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        width: "100%",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    input: {
        width: "90%",
        paddingVertical: 10,
    },
    add: {
        marginLeft: 10,
        padding: 10,
        height: 40,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "rgb(255, 132, 4)",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.62,
        elevation: 5,
    }
})