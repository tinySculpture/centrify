// @refresh reset

import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, TextInput, View, Button, KeyboardAvoidingView, Platform } from 'react-native'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, firedb } from '../firebase/firebase-config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagingUI({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [currentUserData, setCurrentUserData] = useState({
        name: "",
        email: "",
        profileImage: "",
        section: "",
        strand: "",
        uid: "",
    });

    useEffect(() => {
        getCurrentUser();
        setMessages([
        {
            _id: 1,
            text: 'Hello',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'User Name',
            avatar: 'https://firebasestorage.googleapis.com/v0/b/centrify-c1219.appspot.com/o/profileImages%2Fprofile-placeholder.jpg?alt=media&token=05c182ff-ddf7-46f5-9a72-1101281cc71b',
            },
        },
        ])
    }, []);

    const getCurrentUser = async () => {
        const currentUID = auth.currentUser.uid;
        const userRef = doc(firedb, `users/${currentUID}`);
        const getUser = await getDoc(userRef);
        const userData = getUser.data();
        setCurrentUserData({
            name: userData.name,
            email: userData.email,
            profileImage: userData.profileImage,
            section: userData.section,
            strand: userData.strand,
            uid: userData.uid,
        });
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        // const {
        //     _id,
        //     createdAt,
        //     text,
        //     user,
        // } = messages[0]
        // const currentUID = auth.currentUser.uid;
        // addDoc(collection(firedb, `chats`), {
        //     _id,
        //     createdAt,
        //     text,
        //     user,
        // })
    }, [])

    // useLayoutEffect(() => {
    //   const chatQuery = query(collection(firedb, `chats`), orderBy("createdAt", "desc"));
    //   const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
    //         setMessages(
    //             snapshot.docs.map((doc) => {
    //                 _id: doc.data()._id;
    //                 createdAt: doc.data().createdAt;
    //                 text: doc.data().text;
    //                 user: doc.data().user;
    //             })
    //         )
    //   })
    
    //   return unsubscribe;
    // }, [])

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
                keyboardVerticalOffset={80}
            >
                <GiftedChat
                    messages={messages}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: currentUserData.uid,
                        name: currentUserData.name,
                        avatar: currentUserData.profileImage
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 0,
    },
})
