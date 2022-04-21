import React from "react";
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import PostControl from "./PostControl";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { auth, firedb } from "../../firebase/firebase-config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteDoc, doc } from "firebase/firestore";

export default function Post({ name, strand, section, profileImage, title, body, image, likes, comments, userID, postKey, timeStamp, dislikes }) {
    
    const deletePost = () => {
        Alert.alert("Delete Post?", "Are you sure you want to delete?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancelled delete"),
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => confirmDelete(),
                style: "destructive",
            }
        ])
    }

    const confirmDelete = () => {
        const currentUID = auth.currentUser.uid;
        deleteDoc(doc(firedb, `users/${currentUID}/posts/${timeStamp}`))
    }

    const DeleteButton = () => {
        const currentUID = auth.currentUser.uid;
        if (userID == currentUID) {
            return(
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deletePost()}
                >
                    <MaterialIcon name="delete" size={18} color={"black"}/>
                </TouchableOpacity>
            )
        }else {
            return null
        }
    }

    if (image == null || image == "") {
        return(
            <View style={styles.card}>
                <View style={styles.userCont}>
                    <Image source={profileImage != "" ? {uri: profileImage} : null} style={styles.profileImage} />
                    <View style={styles.userTitles}>
                        <Text style={{fontSize: 18, fontFamily: "Roboto_Bold"}}>{name}</Text>
                        <Text>{strand} - {section}</Text>
                    </View>
                    <DeleteButton />
                </View>
                <Text style={[GlobalStyles.heading, styles.title]}>{title}</Text>
                <Text style={[GlobalStyles.text]}>{body}</Text>

                <PostControl likes={likes} dislikes={dislikes} comments={comments} userID={userID} postKey={postKey} timeStamp={timeStamp}/>
            </View>
        )
    }else {
        return(
            <View style={styles.card}>
                <View style={styles.userCont}>
                    <Image source={profileImage != "" ? {uri: profileImage} : null} style={styles.profileImage} />
                    <View style={styles.userTitles}>
                        <Text style={{fontSize: 18, fontFamily: "Roboto_Bold"}}>{name}</Text>
                        <Text>{strand} - {section}</Text>
                    </View>
                    <DeleteButton />
                </View>
                <Text style={[GlobalStyles.heading, styles.title, ]}>{title}</Text>
                <Text style={[GlobalStyles.text]}>{body}</Text>
    
                <Image source={image != "" ? {uri: image} : null} style={styles.image} />
                <PostControl likes={likes} dislikes={dislikes} comments={comments} userID={userID} postKey={postKey} timeStamp={timeStamp}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    userCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    userTitles: {
        flexDirection: "column",
        flex: 5,
    },
    profileImage: {
        backgroundColor: "#aa0",
        borderRadius: 50,
        width: 50,
        height: 50,
        marginRight: 10,
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    deleteButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    image: {
        width: "100%",
        height: 250,
        maxHeight: 250,
    }
})

