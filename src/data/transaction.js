import { ethers } from "ethers";
import "@ethersproject/shims"
import "react-native-get-random-values";


const transaction = async (privateKey, provider, to, value) => {

    let wallet = "";
    let transactionPromise = "";

    try {
        wallet = new ethers.Wallet(privateKey, provider);
    } catch (error) {
        console.log(error)
        alert("Something has gone wrong \nPlease check your private key");
    }

    try {
        transactionPromise = await wallet.sendTransaction({
            to: to,
            value: ethers.utils.parseEther(value),
        })
    } catch (error) {
        console.log(error)
        alert("Something has gone wrong \nPlease check the addressee");
    }

    let transaction = await transactionPromise.wait();
}

export default transaction;