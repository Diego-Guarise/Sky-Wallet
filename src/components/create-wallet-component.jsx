import React from "react";
import { Text, View, TextInput, TouchableOpacity} from "react-native";
import theme from "../data/theme";
import getStore from "../store/store-redux";
import createWallet from "../data/create-wallet";
import decrypt from "../data/decrypt";

const CreateWalletComponent = () => {

    const [_password1, setPassword1] = React.useState("");
    const [_password2, setPassword2] = React.useState("");
    const [_seed, setSeed] = React.useState("");
    
    const store = getStore();

    const password1 = (password1) => {
        setPassword1(password1);
    };

    const password2 = (password2) => {
        setPassword2(password2);
    };

    const passwordIsCorrect = () => {
        if(_password1.length < 8 || _password2.length < 8){
            alert("Password must be 8 or more");
        } else {
            if (_password1 === _password2) {
                return true;
            } else {
                alert("Passwords are not equal");
            }
        }
        return false;
    }

    const checkData = async () => {
        if (passwordIsCorrect()) {
            await createWallet(_password1);

            store.dispatch({
                type: "SET_PASSWORD",
                password: true
            });
            store.dispatch({
                type: "SET_SEED",
                seed: true
            });

            let wallet = await decrypt(_password1);

            store.dispatch({
                type: "SET_ADDRESS",
                address: wallet.address
            });
            store.dispatch({
                type: "SET_LOGIN",
                login: true
            });

            const seed = wallet.mnemonic.phrase;
            setSeed(seed);
        }
    }


    return (
        <View>
            <TextInput 
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="Password"
                style={[theme.textInput]}
                placeholderTextColor="grey"
                onChangeText={password1}
            />
            <TextInput 
                autoCapitalize="none"
                secureTextEntry={true}
                placeholder="Repeat password"
                style={[theme.textInput]}
                placeholderTextColor="grey"
                onChangeText={password2}
            />
            <TouchableOpacity
                    onPress={() => {
                    checkData();
                    }}
                    style={theme.button}
                >
                <Text style={theme.buttonText}>Create Wallet</Text>
            </TouchableOpacity>
            <Text style={theme.tittle}>2° Copy mnemonic phrase</Text>
            <View style={theme.divLarge}>
                <Text style={[theme.seedPhrase, {paddingTop : 5}]}>{_seed}</Text>
            </View>
        </View>
    );
}

export default CreateWalletComponent;