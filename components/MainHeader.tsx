import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MainHeader({ name, navigation, current, setContent}) {

    const [curIcon, setCurIcon] = useState("account-circle-outline");

    useEffect(() => {
        if (current == "Timer") {
            setCurIcon("account-circle-outline");
        }else {
            setCurIcon("timer-outline");
        }
    }, [current])
    

    const editPressHandler = () => {
        if (current == "Timer") {
            setContent("Profile");
            navigation.navigate('Social');
        }else {
            setContent("Timer");
            navigation.navigate('Timer');
        }
    }

    return(
        <View style={styles.navbar}>
            <TouchableOpacity
                onPress={ () => editPressHandler() }
            >
                <Icon name={curIcon} size={30} color="#000" />
            </TouchableOpacity>
            {/* <Text style={styles.title}>{name}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: 30,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10
    }
})