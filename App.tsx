import 'react-native-gesture-handler';

// React:
import { StyleSheet, View, Dimensions, Text, LogBox } from 'react-native';
import React, { useState } from 'react'

// Custom Components
import LoginScreen from './components/login/LoginScreen';
import MainContent from './components/MainContent';
import MainHeader from './components/MainHeader';

// Styles
import { useFonts } from 'expo-font';
import { GlobalStyles } from './components/styles/GlobalStyles';

// External Imports
import AppLoading from 'expo-app-loading';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import SignupScreen from './components/login/SignupScreen';
import StrandSignupScreen from './components/login/StrandSignupScreen';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

export default function App() {

	const [fontsLoaded] = useFonts({
		Roboto_Light: require('./assets/fonts/Roboto-Light.ttf'),
		Roboto_LightI: require('./assets/fonts/Roboto-LightItalic.ttf'),
		Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
		Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
		Roboto_Black: require('./assets/fonts/Roboto-Black.ttf'),
		PlayfairDisplay_Bold: require('./assets/fonts/PlayfairDisplay-Bold.otf'),
	})

	const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
	const [uid, setUid] = useState();

	const childProps = {
		name,
		setName,
		email,
		setEmail,
		password,
		setPassword
	}

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const appStack = createStackNavigator();

	return(
		<NavigationContainer independent={true}>
			<appStack.Navigator
				initialRouteName='Login'
				screenOptions={{
					headerShown: false,
				}}
			>
				<appStack.Screen name="Login">
					{(props) => <LoginScreen {...props} />}
				</appStack.Screen>
				<appStack.Screen name="Signup">
					{(props) => <SignupScreen {...props} {...childProps} uid={uid} setUid={setUid} />}
				</appStack.Screen>
				<appStack.Screen name="Signup_2">
					{(props) => <StrandSignupScreen {...props} {...childProps} uid={uid} setUid={setUid} />}
				</appStack.Screen>
				<appStack.Screen name="Main">
				{(props) => <MainContent {...props} />}
				</appStack.Screen>
			</appStack.Navigator>
		</NavigationContainer>
	)
}
