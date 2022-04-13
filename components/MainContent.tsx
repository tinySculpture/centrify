import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, {useRef, useState} from 'react'
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';

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
    const snapPoints = ["40%", "60%"];

    switch (current) {
        case 'Timer':
            return(
                <GestureHandlerRootView style={styles.container}>
                    <PomodoroTimer />
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                    >
                        <BottomSheetView style={styles.title}>
                            <Text style={styles.titleText}>Todo List</Text>
                        </BottomSheetView>

                        <TodoList todos={todos} setTodos={setTodos} />
                    </BottomSheet>
                </GestureHandlerRootView>
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
        flex: 1,
        justifyContent: "space-evenly"
	},
    title: {
        paddingHorizontal: 30,
    },
    titleText: {
        fontSize: 20,
        width: "100%",
        textAlign: "center",
    }
});