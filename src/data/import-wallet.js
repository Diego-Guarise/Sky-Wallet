import { ethers } from "ethers";
import "@ethersproject/shims";
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import getStore from "../store/store-redux";

const importWallet = async (mnemonic, password) => {

    const store = getStore();

    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    store.dispatch({
        type: "SET_ADDRESS",
        address: wallet.address
    });

    let walletEncrypt = wallet.encrypt(password);

    let walletJson = walletEncrypt.then(function (json) {
                        return json;
                    })

    await SecureStore.setItemAsync("wallet", await walletJson);

    return await walletJson;
}

export default importWallet;