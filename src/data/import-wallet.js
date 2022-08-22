import { ethers } from "ethers";
import "@ethersproject/shims";
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import getStore from "../store/store-redux";

const importWallet = async (mnemonic, password) => {

    const store = getStore();
    let wallet = null;
    try {
        wallet = ethers.Wallet.fromMnemonic(mnemonic);
    } catch (error) {
        alert("Something has gone wrong \nPlease check your mnemonic");
        return "error";
    }

    store.dispatch({
        type: "SET_ADDRESS",
        address: wallet.address
    });
    store.dispatch({
        type: "SET_LOGIN",
        login: true
    });

    let walletEncrypt = wallet.encrypt(password);

    let walletJson = walletEncrypt.then(function (json) {
                        return json;
                    })

    await SecureStore.setItemAsync("wallet", await walletJson);

    return await walletJson;
}

export default importWallet;