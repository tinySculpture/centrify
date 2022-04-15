// Imports
// React Native:
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FormInput from './FormInput';
import { Colors, DEVICE_WIDTH, GlobalStyles } from '../styles/GlobalStyles';

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginHandler = () => {
        // TODO: Check form validity
        // console.log(email, password);
    }

    return(
        <View style={[GlobalStyles.mainContainer, styles.mainContainer]}>
            <View style={styles.logo}>
                <Image source={require('../../assets/centrify_white.png')} style={styles.logoImage} />
                <Text style={styles.logoText}>CENTRIFY</Text>
            </View>

            {/* Bottom Card */}
            <View style={styles.card}>

                {/* Heading Start */}
                <Text style={{
                    marginTop: 30,
                    fontSize: 28,
                    fontFamily: "Roboto_Black"
                    }}
                >
                    Welcome to Centrify!
                </Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "Roboto_Light",
                    marginBottom: 24,
                    }}
                >
                    Login/Signup to your Centrify account
                </Text>
                {/* Heading End */}

                {/* Form Start */}
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

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontFamily: "Roboto_LightI",
                        marginRight: 5,
                        }}
                    >
                        Don't Have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={{
                            backgroundColor: "rgba(255, 132, 4, 0.85)",
                            fontFamily: "Roboto",
                            paddingHorizontal: 8,
                            paddingVertical: 3,
                            borderRadius: 5,
                            color: "#fff",
                            }}
                        >
                            Sign Up.
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Form End */}

                {/* Buttons Start */}
                <View style={{
                    width: "100%",
                    paddingHorizontal: 30,
                }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Main')}
                    >
                        <Text style={{
                            color: "#fff",
                            width: "100%",
                            textAlign: "center",
                            fontFamily: "Roboto_Bold",
                            fontSize: 16,
                        }}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: "Roboto_LightI",
                        marginTop: 5,
                        color: Colors.MAIN_ORANGE
                        }}
                    >
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
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
        flex: 2,
        paddingTop: 30,
    },
    logoImage: {
        height: 200,
        resizeMode: "contain",
    },
    logoText: {
        color: "#fff",
        fontFamily: "PlayfairDisplay_Bold",
        fontSize: 36,
    },
    card: {
        width: DEVICE_WIDTH,
        flex: 3,
        backgroundColor: "#fff",
        borderRadius: 15,
        elevation: 7,
        alignItems: "center",
    },
    button: {
        backgroundColor: Colors.MAIN_ORANGE,
        padding: 10,
        borderRadius: 50,
    },

})