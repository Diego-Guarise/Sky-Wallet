import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import Constants from "expo-constants";
import theme from "../data/theme";
import getStore from "../store/store-redux";
import importWallet from "../data/import-wallet";

const Home = ({ navigation }) => {

    const store = getStore();

    const [_password1, setPassword1] = useState("");
    const [_password2, setPassword2] = useState("");
    const [_seed, setSeed] = useState("");


    const password1 = (password1) => {
        setPassword1(password1);
    };

    const password2 = (password2) => {
        setPassword2(password2);
    };

    const seedIsCorrect = (seed) => {
        setSeed(seed);
    }

    const passwordIsCorrect = () => {
        if(_password1.length < 8 || _password2.length < 8){
            alert("Password must be 8 or more");
        } else {
            if (_password1 === _password2) {
                return true;
            } else {
                alert("Passwords are not equal");
            }
        }
        return false;
    }

    const checkData = async () => {
        if (_seed) {
            if (passwordIsCorrect()) {
                
                let result = await importWallet(_seed, _password1);

                if (result === "error") {
                    return;
                }
                store.getState();
                store.dispatch({
                    type: "SET_PASSWORD",
                    password: true
                });
                store.dispatch({
                    type: "SET_SEED",
                    seed: true
                });
                store.dispatch({
                    type: "SET_LOGIN",
                    login: true
                });


                setPassword1("");
                setPassword2("");
                setSeed("");
                navigation.navigate('Wallet')
            } else {
                alert("Create a password");
            }
        } else {
            alert("Please enter seed");
        }
    }

    return (
        <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1, top : 70}}>
            <Image source={require("./../assets/img-sky.png")} style={{position : "absolute", top : -85, left : 0, width : "100%", height: "100%", opacity : 0.7}} />
            <Text style={[theme.tittle, {fontSize : 40, paddingBottom : 60, fontWeight: "bold"}]}>Sky Wallet</Text>
                <TextInput
                    placeholder="Insert your seed phrase"
                    style={[theme.textInput]}
                    placeholderTextColor="grey"
                    onChangeText={seedIsCorrect}
                />
                <TextInput 
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Password"
                    style={[theme.textInput]}
                    placeholderTextColor="grey"
                    onChangeText={password1}
                />
                <TextInput 
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Repeat password"
                    style={[theme.textInput]}
                    placeholderTextColor="grey"
                    onChangeText={password2}
                />
                <TouchableOpacity
                        onPress={() => {
                        checkData();
                        }}
                        style={theme.button}
                    >
                    <Text style={theme.buttonText}>Import Wallet</Text>
                </TouchableOpacity>
            <Text style={[theme.subTittle, {top : 10}]}>Or</Text>
            <TouchableOpacity
                    onPress={() => {
                        setPassword1("");
                        setPassword2("");
                        setSeed("");
                        navigation.navigate('CreateWallet')
                    }}
                    style={[theme.button, {top : 10}]}
                >
                <Text style={theme.buttonText}>Create Wallet</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    tittlee: {
        fontSize: 20,
        textAlign: "center",
        paddingTop: 50,
    },
});

export default Home;

