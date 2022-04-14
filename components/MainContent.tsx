import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useRef, useState} from 'react'
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GlobalStyles } from './styles/globalStyles';

export default function MainContent({current}) {
    //TODO: Do backend for keeping todo list
    const [todos, setTodos] = useState([
        {title: 'Lorem Ipsum dolor sit amet 1', key: 1},
        {title: 'Lorem Ipsum dolor sit amet 2', key: 2},
        {title: 'Lorem Ipsum dolor sit amet 3', key: 3},
        {title: 'Lorem Ipsum dolor sit amet 4', key: 4},
        {title: 'Lorem Ipsum dolor sit amet 5', key: 5},
        {title: 'Lorem Ipsum dolor sit amet 6', key: 6},
        {title: 'Lorem Ipsum dolor sit amet 7', key: 7},
    ]);

    // bottom sheet variables
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["20%", "60%"];

    const currentTodo = () => {
        if (todos.length === 0) {
            return "No tasks left";
        }else {
            return todos[0].title;
        }
    }
    console.log(currentTodo)

    //Switch case for changing components after clicking profile button
    switch (current) {
        case 'Timer':
            return(
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                <GestureHandlerRootView style={styles.container}>
                    <PomodoroTimer currentTodo={currentTodo()}/>
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                    >
                        <BottomSheetView style={styles.title}>
                            <Text style={[GlobalStyles.heading, {textAlign: "left"}]}>Todo List</Text>
                        </BottomSheetView>

                        <TodoList todos={todos} setTodos={setTodos} />
                    </BottomSheet>
                </GestureHandlerRootView>
            </TouchableWithoutFeedback>
            );
            break;
        case 'Profile':
            return(
                <View>
                    <Text>Profile view</Text>
                </View> 
            )
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
        flex: 1,
        justifyContent: "space-evenly"
	},
    title: {
        paddingHorizontal: 30,
        flexDirection: "row",
    },
    titleText: {
        fontSize: 20,
        width: "100%",
        textAlign: "center",
    }
});