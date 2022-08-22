import React from "react";
import { StyleSheet, View } from "react-native";
import StyledText from "../components/styled-text";
import Constants from "expo-constants";
import theme from "../data/theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: Constants.statusBarHeight,
    },
    text: {
        color: theme.appBar.textSecondary,
    },
});

const AppBarTap = ({children, to}) => {

    return (
        <Link to={to}>
            <StyledText style={styles.text}>
                {children}
            </StyledText>
        </Link>
    );
}


const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTap to='/home'>  Home  </AppBarTap>
            <AppBarTap to='/create-wallet'>  Create-Wallet  </AppBarTap>
            <AppBarTap to='/wallet'>  Wallet  </AppBarTap>
        </View>
    );
}


export default AppBar;
