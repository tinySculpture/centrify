import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// app colors: 
// Main Orange #FF8404, rgb(255, 132, 4)

export default function TodoItem({item, todoHandler}) {
    
    return(
        <View style={styles.todoItem}>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => todoHandler(item.key)}>
                <Icon name="close" size={15} color="#000" style={styles.trash} />
            </TouchableOpacity>
            <Text style={styles.todoText}>{item.title}</Text>
        </View>
    )
}

var styles = StyleSheet.create({
    todoItem: {
        borderRadius: 5,
        backgroundColor: "#eee",
        padding: 10,
        marginVertical: 5,
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    todoText: {
        fontSize: 16,
    },
    deleteIcon: {
        padding: 5,
    },
    trash: {
        marginRight: 5,
        padding: 3,
    }
})