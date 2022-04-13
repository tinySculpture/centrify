import { StyleSheet, View} from 'react-native';
import React, { useState } from 'react'
import MainContent from './components/MainContent';
import MainHeader from './components/MainHeader';

export default function App() {
	
	var [curContent, setCurContent] = useState("Todo");

	return (
		<View style={styles.container}>
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
		height: "100%",
		paddingTop: 30,
	},
	mainCont: {
		alignItems: "center",
		justifyContent: "center",
		flexGrow: 1,
	}
});
