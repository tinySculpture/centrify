import 'react-native-gesture-handler';

// React:
import { StyleSheet, View, Dimensions, Text } from 'react-native';
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

const MainScreen = ({ navigation }) => {
	var [curContent, setCurContent] = useState("Timer");

	navigation.reset({
		index: 0,
		routes: [{name: "Main"}]
	})
	
	return (
		<View style={[styles.container, GlobalStyles.mainContainer]}>
			<MainHeader name="Centrify" current={curContent} setContent={setCurContent} />
			<View style={styles.mainCont}>
				<MainContent current={curContent} />
			</View>
		</View>
	);
}

export default function App() {

	const [fontsLoaded] = useFonts({
		Roboto_Light: require('./assets/fonts/Roboto-Light.ttf'),
		Roboto_LightI: require('./assets/fonts/Roboto-LightItalic.ttf'),
		Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
		Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
		Roboto_Black: require('./assets/fonts/Roboto-Black.ttf'),
		PlayfairDisplay_Bold: require('./assets/fonts/PlayfairDisplay-Bold.otf'),
	})

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const appStack = createStackNavigator();

	return(
		<NavigationContainer>
			<appStack.Navigator
				initialRouteName='Login'
				screenOptions={{
					headerShown: false,
				}}
			>
				<appStack.Screen name="Login" component={LoginScreen} />
				<appStack.Screen name="Signup" component={SignupScreen} />
				<appStack.Screen name="Signup_2" component={StrandSignupScreen} />
				<appStack.Screen name="Main" component={MainScreen} />
			</appStack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
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
});
