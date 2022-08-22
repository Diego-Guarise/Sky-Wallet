import { ethers } from "ethers";
import "@ethersproject/shims";
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import getStore from "../store/store-redux";
import decrypt from "../data/decrypt";

const importPk = async (password, pk) => {

    const store = getStore();
    
    if (await decrypt(password) === null){
        return "error";
    }

    let walletNew = null
    try {
        walletNew = new ethers.Wallet(pk)
        alert("Wallet imported \nAddress:\n" + walletNew.address)
    } catch (error) {
        console.log(error)
        alert("Something has gone wrong");
        return "error";
    }

    let address = store.getState().address;

    let listAddress = [];
    let listWallet = [];

    if (typeof(address) === 'number' || typeof(address) === 'string') {
        listAddress.push(address + '');
        listAddress.push(walletNew.address + '');
    } else {
        listAddress = address;
        listAddress.push(walletNew.address + '');
    }

    store.dispatch({
        type: "SET_ADDRESS",
        address: listAddress,
    });

    let json = await SecureStore.getItemAsync("wallet");

    let walletEncrypt = walletNew.encrypt(password);
  
    let walletJson = walletEncrypt.then(function (json) {
        return json;
    })

    listWallet.push(json);
    listWallet.push(await walletJson);

    //await SecureStore.setItemAsync("wallet", stringWallets);

    return listWallet;
}

export default importPk;