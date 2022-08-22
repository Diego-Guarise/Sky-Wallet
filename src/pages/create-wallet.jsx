import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import CreateWalletComponent from "../components/create-wallet-component";
import theme from "../data/theme";
import getStore from "../store/store-redux";


const CreateWallet = ({ navigation }) => {

    const store = getStore();

    const checkData = () => {
        const seed = store.getState().seed;
        if (seed) {
            navigation.navigate("Wallet");
        }
        else {
            alert("Please create a password");
        }
    }

    return (
        <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1, top : 45}}>
            <Image source={require("./../assets/img-sky.png")} style={{position : "absolute", top : -85, left : 0, width : "100%", height: "100%", opacity : 0.7}} />
            <Text style={[theme.tittle,{paddingTop : 30}]}>1° Create a password</Text>
            <CreateWalletComponent />
            <TouchableOpacity 
            style={[theme.button, {height: 75, marginTop: -40}]}
            onPress={() => {checkData();}} >
                <Text style={theme.buttonText}> 
                    I already copied the mnemonic phrase
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default CreateWallet;