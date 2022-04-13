import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Timer from './Timer';

// app colors: 
// Main Orange #FF8404, rgb(255, 132, 4)

export default function PomodoroTimer() {
    var [timerState, setTimerState] = useState({
        studyTime: 30,
        restTime: 10,
        state: 'study',
    });

    var currentTime;
    var isStudying = true;
 
    if (timerState.state == 'study') {
        currentTime = timerState.studyTime;
        isStudying = true
    }else if (timerState.state == 'rest') {
        currentTime = timerState.restTime;
        isStudying = false
    }


    return(
        <View style={styles.timerContainer}>
            <View style={styles.stateContainer}>
                <TouchableOpacity onPress={() =>
                setTimerState({
                    ...timerState,
                    state: 'study',
                })}>
                    <View style={[styles.stateButton, isStudying ? {backgroundColor: "#FF8404"} : styles.stateButton]}>
                        <Text style={[{textAlign: "center"}, isStudying ? {color: "#FFF"} : {color: "#000"}]}>Study</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => 
                    setTimerState({
                    ...timerState,
                    state: 'rest',
                })}>
                    <View style={[styles.stateButton, !isStudying ? {backgroundColor: "#FF8404"} : styles.stateButton]}>
                        <Text style={[{textAlign: "center"}, !isStudying ? {color: "#FFF"} : {color: "#000"}]}>Rest</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Timer time={currentTime} currentTimerState={timerState}/>
        </View>
    )

}

const styles = StyleSheet.create({
    timerContainer: {
        width: "100%",
        height: "auto",
        alignItems: "center"
    },
    stateContainer: {
        width: "80%",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: 20,
        borderRadius: 50,
    },
    stateButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "rgba(255, 132, 4, 0.5)",
        width: 100,
        borderRadius: 50,
    }
})