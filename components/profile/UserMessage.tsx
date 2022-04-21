import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { auth, firedb } from "../firebase/firebase-config";
import { GlobalStyles, DEVICE_WIDTH } from "../styles/GlobalStyles";
import * as RootNavigation from '../RootNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function UserMessage({ setCurrent }) {

    const chatHandler = () => {
        setCurrent("Messaging");
        RootNavigation.navigate("Messaging");
    }

    return(
        <View style={styles.container}>
            <Image
                source={{uri: "https://firebasestorage.googleapis.com/v0/b/centrify-c1219.appspot.com/o/profileImages%2Fprofile-placeholder.jpg?alt=media&token=05c182ff-ddf7-46f5-9a72-1101281cc71b"}}
                style={styles.profileImage}
            />
            <View style={styles.userData}>
                <Text style={styles.userName}>User Name</Text>
                <Text>STEM - S12-01</Text>
            </View>
            <TouchableOpacity
                onPress={() => chatHandler()}
                style={styles.followButton}
            >
                <MaterialIcon name="navigate-next" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: 80,
        backgroundColor: "#fff",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderBottomColor: "#ddd",
        borderTopColor: "#ddd",
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    userData: {
        // marginStart: 10,
    },
    userName: {
        fontSize: 18,
        fontFamily: "Roboto_Bold"
    },
    followButton: {
        padding: 5,
        alignSelf: "center",
    }
})