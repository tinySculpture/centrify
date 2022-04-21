import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, GlobalStyles } from "../styles/GlobalStyles";
import Post from "./home_components/Post";
import uuid from 'react-native-uuid';
import { auth, db, firedb } from "../firebase/firebase-config";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { storage } from "../firebase/firebase-config";

export default function Home({title, body, image }) {

    const [posts, setPosts] = useState([]);
    const [profileImage, setProfileImage] = useState<String>();
    const [userID, setUserID] = useState();

    useEffect(() => {
        let isSubscribed = true;
        const getPostData = async () => {
            const currentUID = auth.currentUser.uid;
            const queryFollowing = query(collection(firedb, `users/${currentUID}/following`));
            const querySnapshot = await getDocs(queryFollowing)
            return querySnapshot
        }

        getPostData().then((querySnapshot) => {
            if (isSubscribed) {
                querySnapshot.forEach(async (user) => {
                    const userDetailsRef = doc(firedb, `users/${user.data().uid}`)
                    const queryUserDetails = await getDoc(userDetailsRef);
                    const queryUserPosts = query(collection(firedb, `users/${user.data().uid}/posts`));
                    onSnapshot(queryUserPosts, (userPost) => {
                        setPosts([])
                        userPost.forEach((post) => {
                            const postItem = post.data()
                            const userItem = queryUserDetails.data()
            
                            let postProps = {
                                // Post props
                                title: postItem.title,
                                body: postItem.body,
                                image: postItem.image,
                                likes: postItem.likes,
                                dislikes: postItem.dislikes,
                                comments: postItem.comments,
                                key: postItem.key,
                                postKey: postItem.key,
                                timeStamp: postItem.timeStamp,
                                //User props
                                name: userItem.name,
                                strand: userItem.strand,
                                section: userItem.section,
                                profileImage: userItem.profileImage,
                                uid: userItem.uid,
                            }
                            setPosts((prev) => [
                                ...prev,
                                postProps,
                            ]);
                        })
                    })
                })
            }
        })
        return () => {
            isSubscribed = false;
        };
    }, []);

    

    if (posts.length == 0 || posts == null) {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Follow someone to see their posts.</Text>
            </View>
        )
    }else {
        return(
            <View>
                <FlatList
                    data={posts}
                    renderItem={ ({item}) => 
                        <Post
                            name={item.name}
                            strand={item.strand}
                            section={item.section}
                            profileImage={item.profileImage}
                            title={item.title}
                            body={item.body}
                            image={item.image}
                            likes={item.likes}
                            dislikes={item.dislikes}
                            comments={item.comments}
                            userID={item.uid}
                            postKey={item.postKey}
                            timeStamp={item.timeStamp}
                        />}
                    keyExtractor={(item, index) => item.key}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {

    }
})