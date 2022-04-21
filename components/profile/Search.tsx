import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { GlobalStyles, DEVICE_WIDTH } from "../styles/GlobalStyles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, firedb } from "../firebase/firebase-config";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchedUser from "./search_components/SearchedUser";
import * as uuid from "uuid";

export default function Search() {

    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([]);
    }, [])

    const getUser = (userName) => {
        console.log(userName)
        const currentUID = auth.currentUser.uid;
        const usersQuery = query(collection(firedb, "users"), where("name", ">=", userName));

        onSnapshot(usersQuery, (querySnapshot) => {
            setUsers([]);
            if (userName == "") {
                setUsers([]);
            }else {
                querySnapshot.forEach((user) => {
                    if (user.data().uid != currentUID) {
                        setUsers((prev) => [
                            ...prev,
                            user.data()
                        ])
                    }
                })
            }
        })
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search User"
                    maxLength={40}
                    onChangeText={(text) => {
                        setSearchText(text)
                        getUser(text)
                    }}
                    value={searchText}
                    defaultValue={searchText}
                />
                <TouchableOpacity
                    style={styles.searchIconContainer}
                    onPress={() => getUser(searchText)}
                >
                    <MaterialIcon name="search" size={24} color="#000" style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                renderItem={ ({item}) => 
                    <SearchedUser
                        name={item.name}
                        strand={item.strand}
                        section={item.section}
                        profileImage={item.profileImage}
                        uid={item.uid}
                        
                    />}
                key={uuid.v4()}
                keyExtractor={(item, index) => item.uid}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: DEVICE_WIDTH,
    },
    searchBarContainer: {
        width: "100%",
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#000",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        flex: 10,
    },
    searchIconContainer: {
        padding: 3,
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
    }
})