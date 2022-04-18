import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from "../../styles/GlobalStyles";
import PostControl from "./PostControl";

const Image = ({ image }) => {
    if (image == "" || image == undefined || image == null) {
        return null;
    }else {
        return(
            <View style={styles.image}>
                {/* Insert Image */}
            </View>
        )
    }
}

export default function Post({ name, strand, section, profileImage, title, body, image }) {
    if (image == null || image == "") {
        return(
            <View style={styles.card}>
                <View style={styles.userCont}>
                    <View style={styles.profileImage}>
                        {/* Insert Image */}
                    </View>
                    <View style={styles.userTitles}>
                        <Text style={{fontSize: 18, fontFamily: "Roboto_Bold"}}>{name}</Text>
                        <Text>{strand} {section}</Text>
                    </View>
                </View>
                <Text style={[GlobalStyles.heading, styles.title, ]}>{title}</Text>
                <Text style={[GlobalStyles.text, styles.description, ]}>{body}</Text>
    
                <Image image={image} />
                <PostControl />
            </View>
        )
    }else {
        return(
            <View style={styles.card}>
                <View style={styles.userCont}>
                    <View style={styles.profileImage}>
                        {/* Insert Image */}
                    </View>
                    <View style={styles.userTitles}>
                        <Text style={{fontSize: 18, fontFamily: "Roboto_Bold"}}>{name}</Text>
                        <Text>{strand} {section}</Text>
                    </View>
                </View>
                <Text style={[GlobalStyles.heading, styles.title, ]}>{title}</Text>
                <Text style={[GlobalStyles.text, styles.description, ]}>{body}</Text>
    
                <PostControl />
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
    },
    userTitles: {
        flexDirection: "column",
    },
    profileImage: {
        backgroundColor: "#aa0",
        borderRadius: 50,
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 20,
    },
    description: {

    },
    image: {
        width: "100%",
        backgroundColor: "#eee",
        height: 250,
        maxHeight: 250,
    }
})

