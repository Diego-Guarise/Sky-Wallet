import React, { useState } from "react";
import { ethers } from "ethers";
import { Text, View, TouchableOpacity, Modal, TextInput, StyleSheet, Image, ScrollView } from "react-native";
import theme from "../data/theme";
import * as SecureStore from 'expo-secure-store';
import decrypt from "../data/decrypt";
import getStore from "../store/store-redux";
import importPk from "../data/import-pk";
import SelectList from 'react-native-dropdown-select-list';
import getBalance from "../data/balance";
import history from "../data/get-history";
import transaction from "../data/transaction";


const Wallet = ({ navigation }) => {

    const store = getStore();

    // Modals
    const [walletModal, setWalletModal] = useState(false);
    const [seedModal, setSeedModal] = useState(false);
    const [keyModal, setKeyModal] = useState(false);
    const [transferModal, setTransferModal] = useState(false);
    const [historyModal, setHistoryModal] = useState(false);
    const [logOutModal, setLogOutModal] = useState(false);
    const [balanceModal, setBalanceModal] = useState(false);


    // Variables
    const [_seed, setSeed] = useState("");
    const [_addressIdx, setAddressIndex] = useState('1');
    const [_address, setAddress] = useState('');
    const [_balance, setBalance] = useState("0");
    const [_history, setHistory] = useState([]);
    const [_transfer, setTransfer] = useState("");

    const [network, setNetwork] = useState("rinkeby");
    const [provider, setProvider] = useState(ethers.getDefaultProvider(network));
    
    // inputs
    const [_password, setPassword] = useState("");
    const password = (txt) => {
        setPassword(txt);
    };

    const [_pk, setPk] = useState("");
    const pk = (txt) => {
        setPk(txt);
    }

    const [_ammount, setAmmount] = useState("");
    const ammount = (txt) => {
        setAmmount(txt);
    }
    
    const [_to, setTo] = useState("");
    const to = (txt) => {
        setTo(txt);
    }

    // Buttons anonimous functions

    const BalanceFunction = async () => {
        let balance = await getBalance(provider, _addressIdx);
        setBalance(balance);
    }

    const importPkFunction = async () => {
        if (_password) {
            let result = await importPk(_password, _pk);
            setPassword("");
            setPk("");
            if (result !== "error") {
                setWalletModal(false);
            }
        }
        else {
            alert("Please enter a password");
        }
    }

    const addressArray = () => {
        let array = [];
        let address = store.getState().address
        if (typeof(address) === 'string') {
            array.push({ key: '1', value: address })
        } else {
            // error when showing more than 1 wallet
            array.push({ key: '1', value: address[0] })
            return array;
        }
        return array;
    }


    const seedFunction = async () => {
        if (_password) {
            let walletDecripted = await decrypt(_password);
            setPassword("");
            if (walletDecripted != null) {
                setSeedModal(!seedModal);
                alert(walletDecripted.mnemonic.phrase);
            }
        }
        else {
            alert("Please enter a password");
        }
    }

    const keyFunction = async () => {
        if (_password) {
            let walletDecripted = await decrypt(_password);
            setPassword("");
            if (walletDecripted != null) {
                setWalletModal(!walletModal);
                alert(walletDecripted.privateKey);
            }
        }
        else {
            alert("Please enter a password");
        }
    }

    const transferFunction = () => {
        if (_ammount && _to && _pk) {
            transaction( _pk, provider, _to, _ammount);
            setTransferModal(!transferModal)
        }
        else {
            alert("Please enter an amount, address and your private key");
        }
    }

    const historyFunction = async () => {
        let address = store.getState().address
        if (typeof(address) !== 'string') {
            address = address[parseInt(_addressIdx)];
        }
        let result = await history(address, network);
        if (result) {
            let showHistory = "";
            for (let i = 0; i < result.length; i++) {
                let to = result[i].to;
                let from = result[i].from;
                let value = result[i].value;
                showHistory = showHistory + (`-------\nto:\n${to}\nfrom:\n${from}\nvalue:\n${parseInt(value, 16)}\n-------\n`);
            }
            setHistory(showHistory);
        } else {
            setHistory("No history");
        }
    }

    const logOutFunction = async () => {
        await SecureStore.setItemAsync("wallet", "");

        store.dispatch({
            type: "SET_ADDRESS",
            address: [],
        });
        store.dispatch({
            type: "SET_PASSWORD",
            password: false,
        });
        store.dispatch({
            type: "SET_SEED",
            seed: false,
        });
        store.dispatch({
            type: "SET_LOGIN",
            login: false,
        });

        navigation.navigate("Home");
    }


//, witdh: 100
    return (
        <View style={{marginTop: 10, flexGrow: 1, textAlign : "center"}}>
            <Image source={require("./../assets/img-sky.png")} style={{position : "absolute", top : 24, left : 0, width : "100%", height: "100%", opacity : 0.7}} />
            <View style={[theme.textAddress, { zIndex: 2}]}>
                <SelectList
                    data={addressArray}
                    setSelected={setAddressIndex}
                    placeholder="Select an address"
                    dropdownStyles={{ backgroundColor: '#fff' }}
                    boxStyles={{ backgroundColor: '#fff' }}
                />
            </View>
            {/** Amount */}
            <View style={[theme.divSmall, {paddingTop: 10, top : "15%"}]}>
                <Text style={[theme.modalText, {fontSize: 20, fontWeight: "bold", top : -10}]}>ETH</Text>
                <Text style={[{fontSize:60, top : -36, textAlign: "center"}]}>{_balance}</Text>
            </View>


            {/** BalanceFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={balanceModal}
                onRequestClose={() => {
                    setBalanceModal(!balanceModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={theme.modalView}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setBalanceModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : -20}]}>Balance</Text>
                            <Text style={[{textAling:"center", fontSize:40, top : -15}]}>Your Balance was updated</Text>
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => setBalanceModal(false)}
                        >
                            <Text style={theme.textStylePopUp}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        BalanceFunction();
                        setBalanceModal(true);
                    }}
                        style={[theme.divLeftSmall, {paddingTop: 10, top : 210 }]}>
                    <Image source={require("../assets/balance.png")} style={[theme.icon]} />
                    <Text style={[{fontSize: 20, fontWeight: "bold", top : 76, textAlign : "center"}]}>Balance</Text>
            </TouchableOpacity>


            {/** importPkFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={walletModal}
                onRequestClose={() => {
                setWalletModal(!walletModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={[theme.modalView, {height:"36%"}]}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setWalletModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 22, fontWeight: "bold", top : -20}]}>
                                Private key import
                            </Text>
                            <Text style={[theme.modalText, {fontSize: 20, fontWeight: "bold", top : -25}]}>
                                    Do you want to continue?
                            </Text>
                            <TextInput 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Insert your password"
                                style={[theme.textInput, {top : -30, width: "100%"}]}
                                placeholderTextColor="grey"
                                onChangeText={password}
                            />
                            <TextInput 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Insert private key"
                                style={[theme.textInput, {top : -30, width: "100%"}]}
                                placeholderTextColor="grey"
                                onChangeText={pk}
                            />
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => {
                            importPkFunction();
                        }}
                        >
                            <Text style={theme.textStylePopUp}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        setWalletModal(true);
                        }}
                        style={[theme.divRightSmall, {paddingTop: 10, top : 210}]}>
                <Image source={require("../assets/add-wallet.png")} style={theme.icon} />
                <Text style={[{fontSize: 20, fontWeight: "bold", top : 76, textAlign : "center"}]}>Import</Text>
            </TouchableOpacity>


            {/** seedFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={seedModal}
                onRequestClose={() => {
                setSeedModal(!seedModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={theme.modalView}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setSeedModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : -20}]}>Insert your password</Text>
                            <TextInput 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Insert your password"
                                style={[theme.textInput, {top : -20, width: "100%"}]}
                                placeholderTextColor="grey"
                                onChangeText={password}
                            />
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => seedFunction()}
                        >
                            <Text style={theme.textStylePopUp}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setSeedModal(true)}
                        style={[theme.divRightSmall, {paddingTop: 10, top : 355}]}>
                    <Image source={require("../assets/seed.png")} style={theme.icon} />
                    <Text style={[{fontSize: 20, fontWeight: "bold", top : 76, textAlign : "center"}]}>Seed</Text>
            </TouchableOpacity>


            {/** keyFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={keyModal}
                onRequestClose={() => {
                setKeyModal(!keyModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={[theme.modalView]}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setKeyModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : -20}]}>Insert your password</Text>
                            <TextInput 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Insert your password"
                                style={[theme.textInput, {top : -20, width: "100%"}]}
                                placeholderTextColor="grey"
                                onChangeText={password}
                            />
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => keyFunction()}
                        >
                            <Text style={[theme.textStylePopUp]}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        setKeyModal(true);
                        }}
                        style={[theme.divLeftSmall, {paddingTop: 10, top : 355}]}>
                <Image source={require("../assets/key.png")} style={theme.icon} />
                <Text style={[{fontSize: 20, fontWeight: "bold", top : 76, textAlign : "center"}]}>Key</Text>
            </TouchableOpacity>


            {/** transferFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={transferModal}
                onRequestClose={() => {
                setTransferModal(!transferModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={[theme.modalView, {height : 330}]}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setTransferModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : -20}]}>Transaction</Text>
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => transferFunction()}
                        >
                            <View style={[theme.boxTransaction, {fontSize: 25, fontWeight: "bold"}]}>
                                <TextInput 
                                        autoCapitalize="none"
                                        secureTextEntry={false}
                                        placeholder="Insert address"
                                        style={[theme.textInput]}
                                        placeholderTextColor="grey"
                                        onChangeText={to}
                                    />
                                <TextInput 
                                        autoCapitalize="none"
                                        secureTextEntry={false}
                                        placeholder="Insert ammount"
                                        style={[theme.textInput]}
                                        placeholderTextColor="grey"
                                        onChangeText={ammount}
                                    />
                                <TextInput 
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        placeholder="Insert your private key"
                                        style={[theme.textInput]}
                                        placeholderTextColor="grey"
                                        onChangeText={pk}
                                    />
                            </View>
                        <Text style={theme.textStylePopUp}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        setTransferModal(true);
                        }}
                        style={[theme.divSmall, {paddingTop: 10, top : 520}]}>
                <Text style={[theme.modalText, {fontSize: 20, fontWeight: "bold", top : 16}]}>Transaction</Text>
            </TouchableOpacity>


            {/** historyFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={historyModal}
                onRequestClose={() => {
                setHistoryModal(!historyModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={theme.modalView}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setHistoryModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : -25}]}>History</Text>
                            <ScrollView>
                                <Text style={[theme.modalText, {fontSize: 17, fontWeight: "bold", top : -20}]}>{_history}</Text>
                            </ScrollView>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        historyFunction();
                        setHistoryModal(true);
                        }}
                        style={[theme.history, {paddingTop: 10}]}>
                <Image source={require("../assets/history.png")} style={[theme.icon, {top : -12, left : "5%"}]} />
                <Text style={[{fontSize: 20, fontWeight: "bold", top : 60, textAlign : "center"}]}>History</Text>
            </TouchableOpacity>


            {/** logOutFunction */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={logOutModal}
                onRequestClose={() => {
                setLogOutModal(!logOutModal);
                }}
            >
                <View style={theme.centeredView}>
                    <View style={theme.modalView}>
                        <TouchableOpacity
                            style={[theme.closePopUp]}
                            onPress={() => {
                                setLogOutModal(false);
                            }}
                        >
                            <Text style={[theme.textStylePopUp]}>X</Text>
                        </TouchableOpacity>
                            <Text style={[theme.modalText, {fontSize: 25, fontWeight: "bold", top : 20}]}>Are you sure you want to exit your wallet?</Text>
                        <TouchableOpacity
                        style={[theme.buttonPopUp, theme.buttonClosePopUp]}
                        onPress={() => {
                            logOutFunction();
                            setLogOutModal(!logOutModal)
                        }}
                        >
                        <Text style={[theme.textStylePopUp, styles.div]}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                        setLogOutModal(true);
                        }}
                        style={theme.logOut}>
                <Image source={require("../assets/out.png")} style={[theme.icon, {left : 4, width:65, height:55}]} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    div: {
        shadowColor: "gray",
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: {
            width: 7,
            height: 7
            },
    }
})

export default Wallet;