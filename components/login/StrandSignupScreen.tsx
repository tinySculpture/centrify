// Imports
// React Native:
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FormInput from './FormInput';
import { Colors, DEVICE_WIDTH, GlobalStyles } from '../styles/GlobalStyles';
import { RadioButton } from 'react-native-paper';

export default function StrandSignupScreen() {

    const [section, setSection] = useState();
    const [checkedStrand, setCheckedStrand] = useState<String>();
    
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
                            value="s"
                            status={checkedStrand == "s" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("s")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("s")}>STEM</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="h"
                            status={checkedStrand == "h" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("h")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("h")}>HUMSS</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="a"
                            status={checkedStrand == "a" ? "checked" : "unchecked"}
                            onPress={() => setCheckedStrand("a")}
                            color={Colors.MAIN_ORANGE}
                        />
                        <Text onPress={() => setCheckedStrand("a")}>ABM</Text>
                    </View>
                </View>
                
                <FormInput
                    label={section}
                    icon=""
                    placeholderText="Section"
                    onChangeText={(input) => setSection(input)}
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
                        onPress={() => console.log("hello")}
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