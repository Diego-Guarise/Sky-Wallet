import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const styles = StyleSheet.create({
    textWhiteSmall: {
        fontSize: 12,
        color: "white"
    },
    textBlackSmall: {
        fontSize: 12,
        color: "black"
    },
    textWhiteMedium: {
        fontSize: 18,
        color: "white"
    },
    textBlackMedium: {
        fontSize: 18,
        color: "black"
    },
    textWhiteLarge: {
        fontSize: 24,
        color: "white"
    },
    textBlackLarge: {
        fontSize: 24,
        color: "black"
    },
});

export default function StyledText({textBlackSmall, textWhiteSmall, textBlackMedium, textWhiteMedium,
textBlackLarge, textWhiteLarge, children}) {
    const textStyle = [
        textBlackSmall && styles.textBlackSmall,
        textWhiteSmall && styles.textWhiteSmall,
        textBlackMedium && styles.textBlackMedium,
        textWhiteMedium && styles.textWhiteMedium,
        textBlackLarge && styles.textBlackLarge,
        textWhiteLarge && styles.textWhiteLarge
    ];

    return (
        <Text style={textStyle}>{children}</Text>
    );
}

