import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React from 'react';
import Main from './src/components/main';
import MainStack from './src/navigation/main-stack';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
         
        {/**   <MainStack />  Appbar para ver vistas por individual*/}
        <MainStack />

        
        {/**  <Main /> Main para ver vistas por stack*/}
        

      </NativeRouter>
    </>
  );
}