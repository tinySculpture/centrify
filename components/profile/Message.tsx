import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { auth, firedb } from '../firebase/firebase-config';
import * as RootNavigation from '../RootNavigation';
import UserMessage from './UserMessage';

export default function Message({ current, setCurrent }) {

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        profileImage: null,
        section: "",
        strand: "",
        uid: "",
    });

    useEffect(() => {
        getUserData()
    }, []);


    const getUserData = async () => {
        const currentUID = auth.currentUser.uid;
        const queryUserSnapshot = await getDoc(doc(firedb, `users/${currentUID}`));
        if (queryUserSnapshot.exists()) {
            const user = queryUserSnapshot.data();
            // getProfileImage()
            setUserData({
                email: user.email,
                name: user.name,
                profileImage: user.profileImage,
                section: user.section,
                strand: user.strand,
                uid: user.uid,
            })
        }
    }

    const changeScreen = () => {
        setCurrent("Messaging");
        RootNavigation.navigate("Messaging");
    }

    return(
        <View>
            <TouchableOpacity
                onPress={() => changeScreen()}
            >
                <UserMessage
                    setCurrent={setCurrent}
                />
            </TouchableOpacity>
        </View>
    )
}