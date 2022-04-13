import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheetFlatList, BottomSheetTextInput, TouchableHighlight } from '@gorhom/bottom-sheet';

export default function TodoList({todos, setTodos}) {

    const todoHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
    }

    //TODO: Create Submit Handler
    const submitHandler = (text) => {
        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                { title: text, key: Math.random().toString() },
            ]
        })
    }

    const renderItem= useCallback(({ item }) => (
        <TodoItem item={item} todoHandler={todoHandler}/>
    ), []);

    return(
        <View style={styles.container}>
            {/* <Text style={styles.title}>Todo List</Text> */}
                <View style={styles.container}>
                    <View style={styles.inputCont}>
                        <BottomSheetTextInput style={styles.input} onChangeText={(e) => console.log(e)} />
                        <TouchableHighlight style={styles.icon}>
                            <Icon name='plus' size={20} color="#000" />
                        </TouchableHighlight>
                    </View>

                    <BottomSheetFlatList
                        data={todos}
                        renderItem={renderItem}
                        contentContainerStyle={styles.list}
                    />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 50,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(200, 200, 200, 0.25)',
        width: "90%",
    },
    inputCont: {
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: {
        padding: 8,
        marginTop: 8,
        marginBottom: 10,
    },
    list: {
        paddingBottom: 30,
    }
});