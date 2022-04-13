import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react'
import MainContent from './components/MainContent';
import MainHeader from './components/MainHeader';

export default function App() {

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
	}
});
