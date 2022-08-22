import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

//pages
import Home from '../pages/home';
import Wallet from '../pages/wallet';
import CreateWallet from '../pages/create-wallet';

//components


const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CreateWallet" component={CreateWallet} />
        <Stack.Screen name="Wallet" component={Wallet}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default MainStack;