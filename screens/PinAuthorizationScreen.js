import React , {useState} from  'react';
import { Modal, Text, View,Alert } from 'react-native';
import {TextInput,HelperText, Button} from 'react-native-paper';

export default function PinAuthorizationScreen({route,navigation}) {
  // const [text, setText] = React.useState('');
  // const hasUnsavedChanges = Boolean(text);
  
  React.useEffect(() => {
    setBarcodeScanned()
  }, []);

  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       e.preventDefault();
  //       Alert.alert(
  //         'Cant Go back',
  //         'You have scanned the QRCode in the ATM. Going back would destroy the session',
  //         [
  //           { text: "OK", style: 'cancel', onPress: () => {} },
  //         ]
  //       );
  //     }),
  //   [navigation, hasUnsavedChanges]
  // );


  const  {cardId}  = route.params;
  const [inputPin, setInputPin] = useState("");
  const [isVisible, setVisible] = useState(false);
  const onChangePin = inputPin => setInputPin(inputPin);
  let actualPin = 0

  const setBarcodeScanned=()=>{
    fetch('https://qrbasedatm.herokuapp.com/setBarcodeScanned',{
      method : "POST",
      headers : {
            'Accept': 'application/json, text/plain, */*', 
          'Content-type': 'application/json',
          'authorization': cardId
      }
    })
    .then((res) => res.text())
    .then((responseJson) =>{
      console.log(responseJson)
    })
    .catch((err =>{
      console.log(err)
    }));
  }


  const authorizePinFromCardId=()=>{
      console.log(inputPin)
      fetch('https://qrbasedatm.herokuapp.com/getCardDetails',{
        method : "GET",
        headers : {
            'Content-type': 'application/json',
            'authorization': cardId
        }
      })
      .then(res => res.json())
      .then(data =>{
        if(data.pinId!=null){
          actualPin = data.pinId
          if(actualPin == inputPin)
          {
            navigation.navigate('HomeScreen',{cardId: cardId});
          }
          else{
            setVisible(true)

          }
        } 
      }) 
    .catch(err=>{
      console.log(err)
  })
  }

 return (
    <View>
      <TextInput  keyboardType={'numeric'} secureTextEntry={true} value = {inputPin} label="Enter PIN" onChangeText={onChangePin} />
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style = {{backgroundColor:"#ffffff", height: 10,marginLeft:20, marginRight:20,marginTop:275,marginBottom:275,padding:20, borderRadius:20, flex: 1}}>
        <Text style = {{ fontSize: 30, margin:40 , textAlign:'center'}}>Pin does not match</Text>
        <Button mode="contained" onPress= {()=>{setVisible(false)}}>Ok</Button>
        </View>
        </View>
      </Modal>
      <Button onPress={() => {authorizePinFromCardId()}}>OK</Button>
    </View>
  );
};
