import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, firedb, storage } from "../firebase/firebase-config";
import { DEVICE_WIDTH, GlobalStyles } from "../styles/GlobalStyles";
import * as RootNavigation from "../RootNavigation";
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ current, setCurrent }) {

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        profileImage: null,
        section: "",
        strand: "",
        uid: "",
    });

    const [image, setImage] = useState("")
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0)

    useEffect(() => {
        getUserData()
        setImage(null)
    }, [userData]);

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

        const queryUserFollowing = await getDocs(collection(firedb, `users/${currentUID}/following`));
        setFollowing(queryUserFollowing.docs.length)
        const queryUserFollowers = await getDocs(collection(firedb, `users/${currentUID}/followers`));
        setFollowing(queryUserFollowers.docs.length)
    }

    const handleEditButton = () => {
        updateProfileImage()
    }

    const updateProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            // Bugged in VSCode, dont mind me:
            const currentUID = auth.currentUser.uid;
            const currentTime = Date.now()

            const response = await fetch(result.uri);
            const blob = await response.blob();

            const storageRef = ref(storage, `profileImages/${currentUID}/`);

            uploadBytes(storageRef, blob, {contentType: "image/jpeg"}).then((snapshot) => {
                const uploadRef = ref(storage, snapshot.ref.fullPath)
                getDownloadURL(uploadRef).then(async (url) => {
                    // console.log(url)
                    setImage(url);
                    await updateDoc(doc(firedb, `users/${currentUID}`), {
                        profileImage: url,
                    });
                    
                })
            })
        }
    }

    return(
        <View>
            <Text style={[GlobalStyles.heading, styles.name]}>{userData.name}</Text>
            <View style={styles.profileContainer}>
                <Image source={{uri: userData.profileImage}} style={styles.profileImage} />

                {/* User Data */}
                <View style={styles.metaDataContainer}>
                    {/* Posts, Followers, Following */}
                    <View style={styles.userDataContainer}>
                        <View style={styles.userData}>
                            <Text style={[styles.userDataText]}>0</Text>
                            <Text style={[styles.userDataText]}>Posts</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={[styles.userDataText]}>{followers}</Text>
                            <Text style={[styles.userDataText]}>Followers</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={[styles.userDataText]}>{following}</Text>
                            <Text style={[styles.userDataText]}>Following</Text>
                        </View>
                    </View>

                    {/* Edit Profile */}
                    <View style={styles.editProfileButtonContainer}>
                        <TouchableOpacity
                            style={styles.editprofileButton}
                            onPress={() => handleEditButton()}
                        >
                            <Text style={styles.editProfileText}>Change Profile Image</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section, Strand */}
                    <View>
                        <Text style={styles.userSectionText}>{userData.strand} - {userData.section}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.previousPostsContainer}>
                <Text>Previous Posts</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 10,
    },
    profileContainer: {
        width: DEVICE_WIDTH,
        height: 150,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
    },
    profileImage: {
        width: 100,
        height: 100,
        // backgroundColor: "#aaa",
        borderRadius: 500,
        resizeMode: "center",
        flex: 1,
    },
    metaDataContainer: {
        flex: 3,
        // backgroundColor: "#222",
        alignItems: "center",
        height: 100,
        justifyContent: "space-evenly",
    },
    userDataContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    userData: {
        alignItems: "center",
    },
    userDataText: {
        fontSize: 12,
    },
    editProfileButtonContainer: {
        width: "80%",
        alignItems: "stretch",
    },
    editprofileButton: {
        backgroundColor: "#eee",
        paddingVertical: 5,
        width: "100%",
        borderRadius: 5,
    },
    editProfileText: {
        width: "100%",
        textAlign: "center",
    },
    userSectionText: {
        fontFamily: "Roboto_Bold",
        fontSize: 16,
    },
    previousPostsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    }
})