import { ethers } from "ethers";
import "@ethersproject/shims";
import "react-native-get-random-values";

const history = async (address, network) => {

    let provider = new ethers.providers.EtherscanProvider(network);
    let history = await provider.getHistory(address);

    return history
}

export default history;