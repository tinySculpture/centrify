import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, firedb } from "../../firebase/firebase-config"
import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
 
export default function PostControl({ likes, dislikes, comments, userID, postKey, timeStamp }) {

    const [isLiked, setIsLiked] = useState<Boolean>();
    const [isDisliked, setIsDisliked] = useState<Boolean>()
    const postDoc = doc(firedb, `users/${userID}/posts/${timeStamp}`);
    const [tempLike, setTempLike] = useState<number>(likes.length || 0);

    useEffect(() => {
        let isMounted = true;
        const currentUID = auth.currentUser.uid;
        const postDoc = collection(firedb, `users/${userID}/posts}`);
        if (likes > 0) {
            const queryPostData = query(postDoc, where(currentUID, "in", likes))
            onSnapshot(queryPostData, (data) => {
                if (isMounted) {
                    setIsLiked(likes.length > 0 ? true : false)
                }
            })
        }else if (dislikes > 0) {
            const queryPostData = query(postDoc, where(currentUID, "in", dislikes))
            onSnapshot(queryPostData, (data) => {
                if (isMounted) {
                    setIsDisliked(dislikes.length > 0 && likes.includes(currentUID) ? true : false)
                }
            })
        }
        
    
        return () => {
            isMounted = false
        }
    }, [])
    

    const handleLike = async () => {
        const currentUID = auth.currentUser.uid;
        const postDoc = doc(firedb, `users/${userID}/posts/${timeStamp}`);
        const queryPost = await getDoc(postDoc);
        updateDoc(postDoc, {
            likes: arrayUnion(currentUID),
            dislikes: arrayRemove(currentUID)
        })
        
        setIsLiked(queryPost.data().likes.length > 0 && queryPost.data().likes.includes(currentUID) ? true : false)
        setIsDisliked(queryPost.data().dislikes.length > 0 && queryPost.data().likes.includes(currentUID) ? true : false)
    }

    const handleDislike = async () => {    
        const currentUID = auth.currentUser.uid;
        const postDoc = doc(firedb, `users/${userID}/posts/${timeStamp}`);
        const queryPost = await getDoc(postDoc);
        updateDoc(postDoc, {
            dislikes: arrayUnion(currentUID),
            likes: arrayRemove(currentUID)
        })

        setIsLiked(queryPost.data().likes.length > 0 && queryPost.data().likes.includes(currentUID) ? true : false)
        setIsDisliked(queryPost.data().dislikes.length > 0 && queryPost.data().likes.includes(currentUID) ? true : false)
    }
    
    return(
        <View style={styles.container}>

            <View style={styles.iconCont}>
                <TouchableOpacity
                    onPress={() => handleLike()}
                >
                    <MaterialIcon name={"thumb-up-off-alt"} size={20} color={"black"}/>
                </TouchableOpacity>
                <Text style={styles.text}>{tempLike}</Text>
                <TouchableOpacity
                    onPress={() => handleDislike()}
                    style={{
                        marginStart: 5,
                    }}
                >
                    <MaterialIcon name={"thumb-down-off-alt"} size={20} color={"black"}/>
                </TouchableOpacity>
            </View>

            <View style={styles.iconCont}>
                <TouchableOpacity>
                    <Icon name="comment-outline" size={20} color={"black"}/>
                </TouchableOpacity>
                <Text style={styles.text}>{comments}</Text>
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
        paddingTop: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        marginStart: 5,
    }
})