import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import PomodoroTimer from "./PomodoroTimer";
import { DEVICE_HEIGHT, GlobalStyles } from "./styles/GlobalStyles";
import TodoList from "./TodoList";
import uuid from 'react-native-uuid';


import { auth, db } from "./firebase/firebase-config";

export default function TimerWithTodo({ navigation }) {
    // bottom sheet variables
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["20%", "60%"];

    // Todo list
    const currentTodo = () => {
        if (todos.length === 0) {
            return "No tasks left";
        }else {
            return todos[0].title;
        }
    }
32
    const [todos, setTodos] = useState([]);

    const currentUID = auth.currentUser.uid;
    useEffect(() => {
        onValue(ref(db, `todos/${currentUID}`), (snapshot) => {
            if (snapshot.exists()) {
                setTodos([]);
                var data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((todo) => {
                        setTodos((prev) => [
                            todo,
                            ...prev
                        ])
                    })
                }   
            }
        })
    }, [])

    return(
        <SafeAreaView style={styles.mainCont}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <GestureHandlerRootView style={styles.container}>
                    <PomodoroTimer currentTodo={currentTodo()} />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainCont: {
		alignItems: "stretch",
		alignSelf: "stretch",
		justifyContent: "space-evenly",
		flexGrow: 1,
	},
    container: {
		backgroundColor: '#fff',
		width: "100%",
        height: "100%",
		paddingTop: 30,
		flexDirection: "column",
        flexGrow: 1,
	},
    title: {
        paddingHorizontal: 30,
        flexDirection: "row",
    },
})