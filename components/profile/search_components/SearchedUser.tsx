import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { auth, firedb } from "../../firebase/firebase-config";
import { GlobalStyles, DEVICE_WIDTH } from "../../styles/GlobalStyles";

export default function SearchedUser({ name, strand, section, profileImage, uid }) {

    const [isFollowing, setIsFollowing] = useState(false)

    const followHandler = async () => {
        const currentUID = auth.currentUser.uid;
        const currentUserRef = doc(firedb, `users/${currentUID}`);
        const userSnap = await getDoc(currentUserRef)
        const followingRef = doc(firedb, `users/${currentUID}/following/${uid}`);
        const followersRef = doc(firedb, `users/${uid}/followers/${currentUID}`)

        await setDoc(followingRef, {
            uid: uid,
            name: name,
        }).then(async () => {
            setIsFollowing(true);
            await setDoc(followersRef, {
                uid: currentUID,
                name: userSnap.data().name,
            })
        })
    }

    const unfollowHandler = async () => {
        const currentUID = auth.currentUser.uid;
        const followingRef = doc(firedb, `users/${currentUID}/following/${uid}`);
        const followersRef = doc(firedb, `users/${uid}/followers/${currentUID}`)

        deleteDoc(followingRef);
        deleteDoc(followersRef)
        setIsFollowing(false);
    }

    useEffect(() => {
        const currentUID = auth.currentUser.uid;
        const followingQuery = query(collection(firedb, `users/${currentUID}/following`), where("uid", "==", uid));
        async () => {
            const querySnapshot = await getDocs(followingQuery);
            querySnapshot.forEach((doc) => {
                setIsFollowing(false)
                console.log(doc.data().uid)
            })
        }
    }, [isFollowing])

    return(
        <View style={styles.container}>
            <Image source={{uri: profileImage}}  style={styles.profileImage} />
            <View style={styles.userData}>
                <Text style={styles.userName}>{name}</Text>
                <Text>{strand} - {section}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {isFollowing ? unfollowHandler() : followHandler()}}
                style={styles.followButton}
            >
                <Text>{isFollowing ? "Unfollow" : "Follow"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: 80,
        backgroundColor: "#eee",
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    userData: {
        marginStart: 20,
        flex: 2,
    },
    userName: {
        fontSize: 18,
        fontFamily: "Roboto_Bold"
    },
    followButton: {
        backgroundColor: "#ddd",
        padding: 5,
        alignSelf: "center",
    }
})