import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, GlobalStyles } from "../styles/GlobalStyles";
import Post from "./home_components/Post";
import uuid from 'react-native-uuid';
import { auth, db, firedb } from "../firebase/firebase-config";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

export default function Home({title, body, image }) {

    const currentUID = auth.currentUser.uid;
    const [postItemProps, setPostItemProps] = useState({
        title,
        body,
        image
    });
    const [posts, setPosts] = useState([])
    const [postUserProps, setPostUserProps] = useState({
        name: "Name Last",
        section: "S12-10",
        strand: "STEM",
        profileImage: "Image",
    })

    useEffect(() => {
        getUserData();
        getPostData();
    }, []);

    const getPostData = async () => {
        setPosts([])
        // const getPostQuery = query(collection(firedb, `users/${currentUID}/posts`));
        const querySnapshot = await getDocs(collection(firedb, `users`));
        querySnapshot.forEach(async (user) => {
            // console.log(user.data().uid)
            setPostItemProps({})
            const getUserPosts = await getDocs(collection(firedb, `users/${user.data().uid}/posts`))
            getUserPosts.forEach((post) => {
                setPosts((prev) => [
                    ...prev,
                    post.data()
                ])
            })
            console.log(posts)
        })
    }

    const getRender = () => {
        posts.map((postItem) => {
            setPostItemProps(postItem)
        })
        return(
            <Post {...postUserProps} {...postItemProps} />
        )
    }

    const getUserData = async () => {
        const usersRef = doc(firedb, "users", currentUID);
        
        const userSnapshot = await getDoc(usersRef);

        if (userSnapshot.exists()) {
            // console.log("test: ", userSnapshot.data())
            const { name, section, strand, profileImage } = userSnapshot.data()
            setPostUserProps(
                {
                    name: name,
                    section: section,
                    strand: strand,
                    profileImage: profileImage != "" || profileImage != undefined ? profileImage : "",
                }
            )
        }
    }

    return(
        <View>
            <FlatList
                data={posts}
                renderItem={ ({item}) => <Post {...postUserProps} title={item.title} body={item.body} image={item.image} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})