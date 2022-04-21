import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContext } from 'react-navigation';
import * as RootNavigation from './RootNavigation';
import { Colors } from './styles/GlobalStyles';

export default function MainHeader({ name, current, setCurrent, createPost, curIcon, setCurIcon }) {

    const editPressHandler = () => {
        if (current == "Timer") {
            setCurIcon('timer-outline');
            RootNavigation.navigate('Social');
            setCurrent("Social");
        }else {
            setCurIcon("account-circle-outline");
            RootNavigation.navigate('Timer');
            setCurrent("Timer");
        }
    }

    const addPostHandler = () => {
        RootNavigation.navigate("NewPost")
        setCurrent("NewPost");
    }

    const goBack = () => {
        RootNavigation.navigate("Social");
        setCurrent("Social");
    }

    if (current == "Timer") {
        return(
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={ () => editPressHandler() }
                >
                    <Icon name={curIcon} size={30} color="#000" />
                </TouchableOpacity>
            </View>
        )
    }else if (current == "Social"){
        BackHandler.addEventListener("hardwareBackPress", function () {
            setCurIcon("account-circle-outline");
            RootNavigation.navigate("Timer");
            setCurrent("Timer");
            return true;
        });

        return(
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={ () => editPressHandler() }
                >
                    <Icon name={curIcon} size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => addPostHandler() }
                >
                    <Icon name="plus" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        )
    }else if(current == "NewPost"){
        BackHandler.addEventListener("hardwareBackPress", function () {
            RootNavigation.navigate("Social");
            setCurrent("Social");
            return true;
        });

        return (
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={ () => goBack() }
                >
                    <MaterialIcon name="arrow-back-ios" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.post}
                    onPress={ () => createPost() }
                >
                    <Text style={{color: "#fff", fontFamily: "Roboto_Bold"}}>POST</Text>
                </TouchableOpacity>
            </View>
        )
    }else if(current == "EditProfile") {
        BackHandler.addEventListener("hardwareBackPress", function () {
            RootNavigation.navigate("Social");
            setCurrent("Social");
            return true;
        });

        return (
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={ () => goBack() }
                >
                    <MaterialIcon name="arrow-back-ios" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.post}
                    onPress={ () => console.log("Test") }
                >
                    <Text style={{color: "#fff", fontFamily: "Roboto_Bold"}}>Apply</Text>
                </TouchableOpacity>
            </View>
        )
    }else {
        BackHandler.addEventListener("hardwareBackPress", function () {
            RootNavigation.navigate("Social");
            setCurrent("Social");
            return true;
        });

        return (
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={ () => goBack() }
                >
                    <MaterialIcon name="arrow-back-ios" size={20} color="#000" />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: 30,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10
    },
    post: {
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: Colors.MAIN_ORANGE,
    }
})