import { ethers } from "ethers";
import "@ethersproject/shims";
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';

const createWallet = async (password) => {

    const wallet =  ethers.Wallet.createRandom()

    let walletEncrypt = wallet.encrypt(password);

    let walletJson = walletEncrypt.then(function (json) {
                        return json;
                    })
    
    await SecureStore.setItemAsync("wallet", await walletJson);

    return await walletJson;
}

export default createWallet;
