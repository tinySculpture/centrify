import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, {useState} from 'react'
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';

export default function MainContent({current}) {
    const [todos, setTodos] = useState([
        {title: 'Lorem Ipsum dolor sit amet 1', key: 1},
        {title: 'Lorem Ipsum dolor sit amet 2', key: 2},
        {title: 'Lorem Ipsum dolor sit amet 3', key: 3},
        {title: 'Lorem Ipsum dolor sit amet 4', key: 4},
        {title: 'Lorem Ipsum dolor sit amet 5', key: 5},
        {title: 'Lorem Ipsum dolor sit amet 6', key: 6},
        {title: 'Lorem Ipsum dolor sit amet 7', key: 7},
        {title: 'Lorem Ipsum dolor sit amet 8', key: 8},
        {title: 'Lorem Ipsum dolor sit amet 9', key: 9},
        {title: 'Lorem Ipsum dolor sit amet 10', key: 10},
    ]);

    switch (current) {
        case 'Timer':
            return(
                <View style={styles.container}>
                    <PomodoroTimer />
                </View>
            );
            break;
        case 'Todo':
            return(
                <View style={styles.container}>
                    <TodoList todos={todos} setTodos={setTodos} />
                </View>
            );
            break;
        default:
            return(
                <View style={styles.container}>
                    <Text>Something went wrong.</Text>
                </View>
            )
        
    }
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
});