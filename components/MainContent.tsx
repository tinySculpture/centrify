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

const Tab = createBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgb(255, 255, 255)',
      primary: Colors.MAIN_ORANGE
    },
  };

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
        case 'Profile':
            return(
                <NavigationContainer
                    theme={MyTheme}
                >
                    <Tab.Navigator
                        initialRouteName='Home'
                        backBehavior='order'
                        screenOptions={{
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarStyle: {
                                bottom: 10,
                                paddingTop: 10,
                            },
                        }}
                        
                    >
                        <Tab.Screen
                            name='Home'
                            component={Home}
                            options={{
                                tabBarIcon: ({focused}) => {
                                    var focusedColor = focused ? Colors.MAIN_ORANGE : "#aaa";
                                    return(
                                        <View style={styles.navIcon}>
                                            <Icon name="home" size={24} color={focusedColor} />
                                            <Text style={[styles.navText, {color: focusedColor}]}>Home</Text>
                                        </View>
                                    )
                                },
                            }}
                        />
                        <Tab.Screen
                            name='Search'
                            component={Search}
                            options={{
                                tabBarIcon: ({focused}) => {
                                    var focusedColor = focused ? Colors.MAIN_ORANGE : "#aaa";
                                    return(
                                        <View style={styles.navIcon}>
                                            <Icon name="magnify" size={24} color={focusedColor} />
                                            <Text style={[styles.navText, {color: focusedColor}]}>Search</Text>
                                        </View>
                                    )
                                },
                            }}
                        />
                        <Tab.Screen
                            name='Message'
                            component={Message}
                            options={{
                                tabBarIcon: ({focused}) => {
                                    var focusedColor = focused ? Colors.MAIN_ORANGE : "#aaa";
                                    return(
                                        <View style={styles.navIcon}>
                                            <Icon name="message-text" size={24} color={focusedColor} />
                                            <Text style={[styles.navText, {color: focusedColor}]}>Message</Text>
                                        </View>
                                    )
                                },
                            }}
                        />
                        <Tab.Screen
                            name='Profile'
                            component={Profile}
                            options={{
                                tabBarIcon: ({focused}) => {
                                    var focusedColor = focused ? Colors.MAIN_ORANGE : "#aaa";
                                    return(
                                        <View style={styles.navIcon}>
                                            <MaterialIcon name="person" size={24} color={focusedColor} />
                                            <Text style={[styles.navText, {color: focusedColor}]}>Profile</Text>
                                        </View>
                                    )
                                },
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
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
    },
    navigator: {
        backgroundColor: "#333",
        height: 100,
    },
    navIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    navText: {
        color: Colors.MAIN_ORANGE,
        fontSize: 12,

    }
});