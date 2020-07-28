import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Withdraw from './screens/Withdraw'
import Deposit from './screens/Deposit'
import BalanceEnquiry from './screens/BalanceEnquiry'
import HomeScreen from './screens/HomeScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import PinAuthorizationScreen from './screens/PinAuthorizationScreen';
import ScanQRCodeScreen from './screens/ScanQRCodeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="ScanQRCodeScreen">
      <Stack.Screen name="ScanQRCodeScreen"  component={ScanQRCodeScreen} />
      <Stack.Screen name="PinAuthorizationScreen"  component={PinAuthorizationScreen} />
      <Stack.Screen name="QRCodeScreen"  component={QRCodeScreen} />
      <Stack.Screen name="HomeScreen"  component={HomeScreen} />
      <Stack.Screen name="Withdraw"  component={Withdraw} />
      <Stack.Screen name="Deposit"  component={Deposit} />
      <Stack.Screen name="BalanceEnquiry"  component={BalanceEnquiry} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}