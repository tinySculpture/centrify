import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useRef, useState} from 'react'

import Home from './profile/Home';
import Search from './profile/Search';
import Message from './profile/Message';
import Profile from './profile/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Colors, DEVICE_HEIGHT, GlobalStyles } from './styles/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function BottomNav({ title, body, image }) {

    const [currentTab, setCurrentTab] = useState()

    const MyTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'rgb(255, 255, 255)',
          primary: Colors.MAIN_ORANGE
        },
    };
    const Tab = createBottomTabNavigator();
    const HomeView = () => {
        return(<Home title={title} body={body} image={image} />)
    }

    return(
        <SafeAreaProvider style={[styles.mainContainer]}>
            <NavigationContainer
                theme={MyTheme}
                independent={true}
            >
                <Tab.Navigator
                    initialRouteName='Home'
                    backBehavior='order'
                    screenOptions={{
                        tabBarShowLabel: false,
                        headerShown: false,
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
                                        {/* <Text style={[styles.navText, {color: focusedColor}]}>Home</Text> */}
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
                                        {/* <Text style={[styles.navText, {color: focusedColor}]}>Search</Text> */}
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
                                        {/* <Text style={[styles.navText, {color: focusedColor}]}>Message</Text> */}
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
                                        {/* <Text style={[styles.navText, {color: focusedColor}]}>Profile</Text> */}
                                    </View>
                                )
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: DEVICE_HEIGHT,
    },
    mainCont: {
		alignItems: "stretch",
		alignSelf: "stretch",
		flexGrow: 1,
	},
    navIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    navText: {
        color: Colors.MAIN_ORANGE,
        fontSize: 12,
    },
})