// Imports
// React Native:
import { StyleSheet, View, Text, Image, TouchableOpacity, LogBox } from 'react-native';
import React, { useState } from 'react';
import FormInput from './FormInput';
import { Colors, DEVICE_WIDTH, GlobalStyles } from '../styles/GlobalStyles';
import { RadioButton } from 'react-native-paper';
import { collection, addDoc, getFirestore, setDoc, doc } from 'firebase/firestore'; 
import { app, firedb, storage } from '../firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, ref } from 'firebase/storage';



export default function StrandSignupScreen({ navigation, name, setName, email, setEmail, password, setPassword, uid, setUid }) {

    LogBox.ignoreLogs(['Setting a timer for a long period of time']);

    const [section, setSection] = useState();
    const [checkedStrand, setCheckedStrand] = useState<String>();

    async function getDocument() {
        const usersRef = doc(firedb, `users/${uid}`);

        try {
            const storageRef = ref(storage);
            const profileImageRef = await ref(storageRef, `profileImages/profile-placeholder.jpg`)
            const tempProfileImage = "https://firebasestorage.googleapis.com/v0/b/centrify-c1219.appspot.com/o/profileImages%2Fprofile-placeholder.jpg?alt=media&token=05c182ff-ddf7-46f5-9a72-1101281cc71b"
            setDoc(usersRef, {
                name: name,
                email: email,
                section: section,
                strand: checkedStrand,
                profileImage: tempProfileImage,
                uid: uid,
            });
            addDoc(collection(firedb, `${usersRef}/following/${uid}`), {
                name: name,
                uid: uid
            })
            alert("Successfully Signed up")
            navigation.navigate('Login')
        } catch (e) {
            console.log(firedb.type)
            console.error("Error signing up: ", e);
        }
    }
    
    return(
        <View style={[GlobalStyles.mainContainer, styles.mainContainer]}>
            <View style={styles.card}>
                <View style={styles.logo}>
                    <Image source={require('../../assets/centrify_orange.png')} style={styles.logoImage} />
                    <Text style={styles.logoText}>CENTRIFY</Text>
                </View>

                {/* Heading Start */}
                <Text style={{
                    marginTop: 30,
                    fontSize: 28,
                    fontFamily: "Roboto_Black"
                    }}
                >
                    Create a Centrify Account
                </Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "Roboto_Light",
                    marginBottom: 24,
                    }}
                >
                    Fill in the information to continue
                </Text>
                {/* Heading End */}

                {/* Form Start */}
                <View style={styles.radioGroup}>
                    <Text style={{fontFamily: "Roboto", fontSize: 20}}>Select Strand</Text>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="STEM"
                            status={checkedStrand == "STEM" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("STEM")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("STEM")}>STEM</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="HUMSS"
                            status={checkedStrand == "HUMSS" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("HUMSS")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("HUMSS")}>HUMSS</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="ABM"
                            status={checkedStrand == "ABM" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("ABM")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("ABM")}>ABM</Text>
                    </View>
                </View>
                
                <FormInput
                    label={section}
                    icon=""
                    placeholderText="Section"
                    onChangeText={(input) => setSection(input)}
                />
                {/* Form End */}

                {/* Buttons Start */}
                <View style={{
                    width: "100%",
                    paddingHorizontal: 30,
                }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => getDocument()}
                    >
                        <Text style={{
                            color: "#fff",
                            width: "100%",
                            textAlign: "center",
                            fontFamily: "Roboto_Bold",
                            fontSize: 16,
                        }}>
                            SIGNUP
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.MAIN_ORANGE,
    },
    logo: {
        width: DEVICE_WIDTH,
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        height: 200,
        resizeMode: "contain",
    },
    logoText: {
        color: Colors.MAIN_ORANGE,
        fontFamily: "PlayfairDisplay_Bold",
        fontSize: 36,
    },
    card: {
        width: DEVICE_WIDTH,
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 15,
        elevation: 7,
        alignItems: "center",
        paddingTop: 60,
        top: 30,
    },
    button: {
        backgroundColor: Colors.MAIN_ORANGE,
        padding: 10,
        borderRadius: 50,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioGroup: {
        width: DEVICE_WIDTH - 60,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 10,
    }
})

function firebaseConfig(firebaseConfig: any) {
    throw new Error('Function not implemented.');
}
