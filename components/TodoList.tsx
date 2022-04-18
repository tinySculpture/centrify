import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState, createRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheetFlatList, BottomSheetTextInput, TouchableHighlight } from '@gorhom/bottom-sheet';
import uuid from 'react-native-uuid';
import { auth, db } from './firebase/firebase-config';
import { child, get, ref, remove, set } from 'firebase/database';

export default function TodoList({ todos, setTodos }) {

    const [text, setText] = useState("");

    const currentUID = auth.currentUser.uid;

    const removeTodoHandler = (key) => {
        remove(ref(db, 'todos/' + currentUID + '/' + key))
        ref(db, 'todos/' + currentUID)
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
    }

    const submitHandler = (text) => {
        if (text == "" || text == undefined) {
            alert("Enter an item");
        }else if(text.length >= 50) {
            alert("Item too long");
        }else {
            const todoKey = uuid.v4();
            set(ref(db, 'todos/' + currentUID + '/' + todoKey), {
                title: text,
                key: todoKey,
                timeStamp: Date.now()
            });
        }
        setText("")
    }

    const textChangeHandler = (val) => {
        setText(val);
    }

    const renderItem = useCallback(({ item }) => (
        <TodoItem item={item} todoHandler={removeTodoHandler} />
    ), []);

    return(
        <View style={styles.container}>
            <View style={styles.inputCont}>
                <BottomSheetTextInput style={styles.input}
                    onChangeText={ (e) => textChangeHandler(e) }
                    placeholder="Add new item"
                    clearTextOnFocus={true}
                    value={text}
                    onSubmitEditing={ () => console.log(text) }
                    clearButtonMode="always"
                />
                <TouchableHighlight
                    style={styles.icon}
                    onPress={ () => submitHandler(text) }
                    underlayColor={"rgba(0, 0, 0, 0)"}
                >
                    <Icon name='plus' size={20} color="#000" />
                </TouchableHighlight>
            </View>

            <BottomSheetFlatList
                data={todos}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
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
        borderRadius: 10,
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