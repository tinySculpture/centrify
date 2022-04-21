import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, firedb } from "../firebase/firebase-config";
import { DEVICE_WIDTH } from "../styles/GlobalStyles";

export default function EditProfile({ navigation }) {

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
    
    return(
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity style={styles.profileImageContainer}>
                <Image source={{uri: userData.profileImage}} style={styles.profileImage}/>
                <Text style={styles.editProfileImage}>Change Profile Image</Text>
            </TouchableOpacity>

            <View style={styles.profileDetailsContainer}>
                <TextInput
                    style={styles.textInput}
                    editable={false}
                    // value={userData.name}
                    placeholder={userData.name}
                    textAlign="center"
                    placeholderTextColor={"#000"}
                />
                <Text>{userData.strand} - {userData.section}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#fff",
        height: "100%",
        alignItems: "center",
    },
    profileImageContainer: {
        alignItems: "center",
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 150,
    },
    editProfileImage: {
        fontSize: 12,
    },
    profileDetailsContainer: {
        height: 400,
        width: DEVICE_WIDTH,
        paddingHorizontal: 60,
        alignItems: "center",
    },
    textInput: {
        width: "100%",
        // borderBottomColor: "#000",
        // borderBottomWidth: 1,
        paddingHorizontal: 5,
        lineHeight: 20,
        fontSize: 22,
        fontFamily: "Roboto_Bold"
    },
});