import { ethers } from "ethers";
import "@ethersproject/shims";
import "react-native-get-random-values";
import * as SecureStore from 'expo-secure-store';

const history = async (address, network) => {

    let provider = new ethers.providers.EtherscanProvider(network);
    let history = await provider.getHistory(address);

    await SecureStore.setItemAsync('historyWallet', JSON.stringify(history));

    return history
}

export default history;