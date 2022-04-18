// Imports
// React Native:
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react'

// Custom Components:
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';
import { GlobalStyles, Colors, DEVICE_HEIGHT, DEVICE_WIDTH } from './styles/GlobalStyles';

// External Imports:
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Bottom Navigation:
import { createStackNavigator } from '@react-navigation/stack';
import MainHeader from './MainHeader';
import BottomNav from './BottomNav';
import { navigationRef } from './RootNavigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TimerWithTodo from './TimerWithTodo';
import CreatePost from './profile/home_components/CreatePost';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firedb } from './firebase/firebase-config';
import uuid from 'react-native-uuid';
import * as RootNavigation from './RootNavigation';

export default function MainContent({ navigation }) {

    const [current, setCurrent] = useState("Timer");
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [key, setKey] = useState(uuid.v4());
    const [curIcon, setCurIcon] = useState("account-circle-outline");

    const createPostProps = {
        setTitle,
        setBody,
        image,
        setImage,
    }

    const postProps = {
        title,
        body,
        image,
    }

    const createPost = () => {
        const currentUID = auth.currentUser.uid;
        setDoc(doc(firedb, `users/${currentUID}/posts`, `${key}`), {
            title: title,
            body: body,
            image: image,
            key: key,
        });
        setCurIcon('timer-outline');
        RootNavigation.navigate('Social');
        setCurrent("Social");
    }

    const Social = ({ navigation }) => {
        return(
            <SafeAreaView style={[styles.container, styles.mainCont]}>
                <BottomNav {...postProps} />
            </SafeAreaView>
        )
    }

    const socialStack = createStackNavigator();
    return(
        <View style={GlobalStyles.mainContainer}>
            <View style={styles.topContainer}>
                <MainHeader
                    createPost={createPost}
                    name="Centrify"
                    current={current}
                    setCurrent={setCurrent}
                    curIcon={curIcon}
                    setCurIcon={setCurIcon}
                />
            </View>
            <SafeAreaProvider>
                <NavigationContainer independent={true} ref={navigationRef}>
                    <socialStack.Navigator
                        initialRouteName='Timer'
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <socialStack.Screen name="Timer">
                            {(props) => <TimerWithTodo {...props} /> }
                        </socialStack.Screen>
                        <socialStack.Screen name="Social">
                            {(props) => <Social {...props} /> }
                        </socialStack.Screen>
                        <socialStack.Screen name="NewPost">
                            {(props) => <CreatePost {...props} {...createPostProps} /> }
                        </socialStack.Screen>
                    </socialStack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: '#fff',
	},
    topContainer: {
		backgroundColor: '#fff',
		width: DEVICE_WIDTH,
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