import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MainHeader({name, current, setContent}) {
    const editPressHandler = () => {
        if (current == "Timer") {
            setContent("Todo");
        }else {
            setContent("Timer");
        }
    }

    return(
        <View style={styles.navbar}>
            <TouchableOpacity>
                <Icon name="account-circle-outline" size={30} color="#000" />
            </TouchableOpacity>
            <Text>{name}</Text>
            <TouchableOpacity
                onPress={() => editPressHandler()}
            >
                <Icon name="pencil-circle-outline" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: 30,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    }
})