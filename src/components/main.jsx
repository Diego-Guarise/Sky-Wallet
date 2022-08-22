import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Route, Redirect} from 'react-router-native';
import AppBar from "../navigation/app-bar";
import Home from "../pages/home";
import CreateWallet from "../pages/create-wallet";
import Wallet from "../pages/wallet";
    
    
const Main = () => {

    return (
        <View style={{flex: 1}}>
            <AppBar />
            <Switch>
                <Route exact path="/home">
                    <Home />
                </Route >
                <Route exact path="/create-wallet">
                    <CreateWallet />
                </Route >
                <Route exact path="/wallet">
                    <Wallet />
                </Route >
                <Redirect to="/home" />
            </Switch>
        </View>
    );
}

export default Main;



const styles = StyleSheet.create({
    logInButton: {
        borderRadius: 10,
    },

    input: {
        borderRadius: 10,
        marginTop: 10,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        align: 'center',
    }
});