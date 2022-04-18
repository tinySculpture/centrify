import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostControl() {
    return(
        <View style={styles.container}>
            <View style={styles.iconCont}>
                <MaterialIcon name="thumb-up-off-alt" size={20} color={"black"} />
                <Text>100</Text>
            </View>
            <View style={styles.iconCont}>
                <Icon name="comment-outline" size={20} color={"black"} />
                <Text>100</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    iconCont: {
        flexDirection: "row",
    }
})