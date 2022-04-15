// Imports
// React Native:
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FormInput from './FormInput';
import { Colors, DEVICE_WIDTH, GlobalStyles } from '../styles/GlobalStyles';

export default function SignupScreen({ navigation }) {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginHandler = () => {
        // TODO: Check form validity
        console.log(email, password);
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
                <FormInput
                    label={name}
                    icon=""
                    placeholderText="Name"
                    onChangeText={(input) => setName(input)}
                />
                <FormInput
                    label={email}
                    icon="person"
                    placeholderText="Email"
                    onChangeText={(input) => setEmail(input)}
                />
                <FormInput
                    label={password}
                    icon="lock"
                    placeholderText="Password"
                    onChangeText={(input) => setPassword(input)}
                    secureTextEntry={true}
                />
                {/* Form End */}

                {/* Buttons Start */}
                <View style={{
                    width: "100%",
                    paddingHorizontal: 30,
                }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Signup_2') }
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

})