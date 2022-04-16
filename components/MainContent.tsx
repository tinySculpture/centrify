// Imports
// React Native:
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useRef, useState} from 'react'

// Custom Components:
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';
import { GlobalStyles, Colors } from './styles/GlobalStyles';

// External Imports:
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Bottom Navigation:
import Home from './profile/Home';
import Search from './profile/Search';
import Message from './profile/Message';
import Profile from './profile/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import MainHeader from './MainHeader';
import BottomNav from './BottomNav';

const Tab = createBottomTabNavigator();

export default function MainContent({ current, setCurrent }) {

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

    const Timer = ({ navigation }) => {
        return(
            <View style={[styles.topContainer, GlobalStyles.mainContainer]}>
                <MainHeader name="Centrify" current={current} setContent={setCurrent} navigation={navigation} />
                <View style={styles.mainCont}>
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
                </View>
            </View>
        );
    }

    const Social = ({ navigation }) => {
        return(
            <View style={[styles.topContainer, GlobalStyles.mainContainer]}>
                <MainHeader name="Centrify" current={current} setContent={setCurrent} navigation={navigation} />
                <BottomNav />
            </View>
        )
    }

    const socialStack = createStackNavigator();

    return(
        <NavigationContainer independent={true}>
            <socialStack.Navigator
                initialRouteName='Login'
                screenOptions={{
                    headerShown: false,
                }}
                detachInactiveScreens={true}
            >
                <socialStack.Screen name="Timer">
                    {(props) => <Timer {...props} /> }
                </socialStack.Screen>
                <socialStack.Screen name="Social">
                    {(props) => <Social {...props} /> }
                </socialStack.Screen>
            </socialStack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
        flex: 1,
        justifyContent: "space-evenly"
	},
    topContainer: {
		backgroundColor: '#fff',
		width: "100%",
		paddingTop: 30,
		flexDirection: "column",
	},
    mainCont: {
		alignItems: "stretch",
		alignSelf: "stretch",
		justifyContent: "space-evenly",
		flexGrow: 1,
	},
    title: {
        paddingHorizontal: 30,
        flexDirection: "row",
    },
    titleText: {
        fontSize: 20,
        width: "100%",
        textAlign: "center",
    },
});