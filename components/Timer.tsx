import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// app colors: 
// Main Orange #FF8404, rgb(255, 132, 4)

export default function Timer({time, currentTimerState}) {
    const [isCountDown, setIsCountDown] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [btnText, setBtnText] = useState("Play");
    const [key, setKey] = useState(0)
    
    useEffect(() => {
      console.log(currentTimerState);
      setIsCountDown(false);
      setBtnText("Play")
    }, [currentTimerState.state])
    

    const handlePlay = () => {
        setBtnText("Stop");
        setIsCountDown(true);
        if (!isPaused) {
            setKey(prevKey => prevKey + 1)
        }
    }

    const handlePause = () => {
        setBtnText("Pause");
        setIsCountDown(false);
        setIsPaused(true);
    }

    const handleStop = () => {
        setBtnText("Play");
        setIsCountDown(false);
        setIsPaused(false);
        setKey(prevKey => prevKey + 1)
    }

    const playButton = () => {
        if (btnText == "Play") {
            return(
                <TouchableOpacity onPress={() => {handlePlay()}}>
                    <View style={buttonStyles.controlButton}>
                        <Icon name="play" size={30} color="#FFF" />
                    </View>
                </TouchableOpacity>
            )
        }else if (btnText == "Stop") {
            return(
                <View style={[{flexDirection: "row"}, styles.controlContainer]}>
                    <TouchableOpacity onPress={() => {handlePause()}}>
                        <View style={buttonStyles.controlButton}>
                            <Icon name="pause" size={30} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleStop()}}>
                        <View style={buttonStyles.controlButton}>
                            <Icon name="stop" size={30} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }else if (btnText == "Pause") {
            return(
                <View style={[{flexDirection: "row"}, styles.controlContainer]}>
                    <TouchableOpacity onPress={() => {handlePlay()}}>
                        <View style={buttonStyles.controlButton}>
                            <Icon name="play" size={30} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleStop()}}>
                        <View style={buttonStyles.controlButton}>
                            <Icon name="stop" size={30} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return(
        <View style={styles.timerContainer}>
            <CountdownCircleTimer
                key={isCountDown || isPaused ? key : time}
                isPlaying={isCountDown}
                duration={time}
                initialRemainingTime={time}
                colors={['rgb(255, 132, 4)']}
                size={250}
                strokeWidth={15}
            >
                {({ remainingTime }) => <Text style={styles.timerText}>00:{remainingTime}</Text>}
            </CountdownCircleTimer>
            <View style={styles.controlContainer}>
                {playButton()}
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    controlContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    timerContainer: {
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 30,
    }
})

var buttonStyles = StyleSheet.create({
    controlButton: {
        paddingVertical: 10,
        backgroundColor: "rgba(255, 132, 4, 1)",
        width: 50,
        textAlign: "center",
        borderRadius: 50,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    }
})