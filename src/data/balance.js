import { ethers } from "ethers";
import "@ethersproject/shims";
import getStore from "../store/store-redux";

const getBalance = async (provider, addressIdx) => {

    const store = getStore();

    let address = store.getState().address;

    if (typeof(address) === 'string') {
        address = address;
    }
    else {
        address = address[addressIdx];
    }
    const balance = await provider.getBalance(address);
    
    return ethers.utils.formatEther(balance);
}

export default getBalance;