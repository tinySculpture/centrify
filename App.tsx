import { StyleSheet, View, Dimensions, Text } from 'react-native';
import React, { useState } from 'react'
import MainContent from './components/MainContent';
import MainHeader from './components/MainHeader';
import { useFonts } from 'expo-font';

export default function App() {

	const [fontsLoaded] = useFonts({
		Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
		Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
	})

	// if (!fontsLoaded) {
	// 	return null;
	// }

	const viewHeight = Dimensions.get("window").height;
	
	var [curContent, setCurContent] = useState("Timer");

	return (
		<View style={[styles.container, {height: viewHeight}]}>
			<MainHeader name="Centrify" current={curContent} setContent={setCurContent} />
			<View style={styles.mainCont}>
				<MainContent current={curContent} />
			</View>
		</View>
	);
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
