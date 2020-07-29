import React , {useState} from  'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

export default function ScanQRCodeScreen({navigation}) {
 return (
     <View style = {styles.container}>
      <AwesomeButtonRick onPress={() => navigation.navigate('QRCodeScreen')}>
       <Text style={{width:200,textAlign:'center'}}>SCAN QR CODE</Text>
      </AwesomeButtonRick>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
});