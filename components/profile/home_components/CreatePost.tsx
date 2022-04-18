import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { auth, firedb } from "../../firebase/firebase-config";
import { Colors, DEVICE_WIDTH, GlobalStyles } from "../../styles/GlobalStyles";

export default function CreatePost({ navigation, setTitle, setBody, image, setImage }) {

    const addImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            // Bugged in VSCode, dont mind me:
            setImage(result.uri);
        }
    }

    return(
        <View style={styles.mainCont}>
            {/* Title */}
            <View style={styles.titleBar}>
                <TextInput
                    style={[GlobalStyles.heading, styles.title]}
                    placeholder="This is a title."
                    maxLength={80}
                    multiline={true}
                    onChangeText={(text) => setTitle(text) }
                />
            </View>

            {/* Body */}
            <View style={styles.bodyInput}>
                <TextInput
                    style={[GlobalStyles.text, styles.body]}
                    placeholder="Describe your title/image."
                    maxLength={300}
                    multiline={true}
                    textAlignVertical="top"
                    onChangeText={(text) => setBody(text) }
                />
                <Image source={{uri: image}} style={styles.image} />
            </View>

            
            {/* Create Image */}
            <SafeAreaView style={styles.icons}>
                <TouchableOpacity
                    onPress={() => addImageHandler()}
                    style={{padding: 5, alignItems: "flex-start"}}
                >
                    <MaterialIcon name="image" size={28} color={Colors.MAIN_ORANGE} style={styles.imageIcon}/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        backgroundColor: "#fff",
        flex: 1,
    },
    titleBar: {
        width: DEVICE_WIDTH,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
    },
    bodyInput: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flex: 1,
    },
    body: {
        // height: 300,
        // maxHeight: 300,
        fontSize: 14,
    },
    icons: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 3,
    },
    imageIcon: {
        backgroundColor: "#666"
    },
    image: {
        height: 400,
        width: "auto",
        resizeMode: "contain",
    }
})