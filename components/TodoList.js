import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './addTodo';

export default function TodoList({todos, setTodos}) {

    const todoHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key);
        });
    }

    const submitHandler = (text) => {
        setTodos((prevTodos) => {
            return [
                ...prevTodos,
                { title: text, key: Math.random().toString() },
            ]
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <View style={styles.listCont}>
                <FlatList 
                    data={todos}
                    renderItem={({ item }) => (
                        <TodoItem item={item} todoHandler={todoHandler}/>
                    )}
                    style={styles.todoItems}
                />
            </View>

            <View style={styles.newTodo}>
                <AddTodo />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    
    },
    newTodo: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    listCont: {
        width: "100%",
        marginHorizontal: 30,
    },
    todoItems: {
        height: 300,
        width: "100%"
    },
    title: {
        fontSize: 20,
    }
});