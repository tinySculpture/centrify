import { StyleSheet, Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("screen").width;
export const DEVICE_HEIGHT = Dimensions.get("screen").height;

// app colors: 
// Main Orange #FF8404, rgb(255, 132, 4)

export const Colors = {
    "MAIN_ORANGE": "#FF8404",
}

export const GlobalStyles = StyleSheet.create({
    text: {
        fontFamily: "Roboto",
    },
    heading: {
        fontFamily: "Roboto_Bold",
        fontSize: 24,
    },
    mainContainer: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
})