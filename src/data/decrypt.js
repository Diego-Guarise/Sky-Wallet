import { ethers } from "ethers";
import "@ethersproject/shims";
import "react-native-get-random-values";
import * as SecureStore from 'expo-secure-store';


const decrypt = async (_password) => {

    let result = await SecureStore.getItemAsync("wallet");

    try {
        const wallet = await ethers.Wallet.fromEncryptedJson(result, _password);
        
        return wallet;
    } catch (error) {
        console.log("error", error)

        alert("Wrong password");
    }

    return null;
};

export default decrypt;
