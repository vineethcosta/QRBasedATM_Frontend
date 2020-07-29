import React , {useState} from  'react';
import { Button, Text, View,SafeAreaView } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CELL_COUNT = 4;




export default function PinAuthorizationScreen({route,navigation}) {
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const toggleMask = () => setEnableMask(f => !f);
    const renderCell = ({index, symbol, isFocused}) => {
      let textChild = null;
  
      if (symbol) {
        textChild = enableMask ? '•' : symbol;
      } else if (isFocused) {
        textChild = <Cursor />;
      }
  

  React.useEffect(() => {
    setBarcodeScanned()
  }, []);



  return (
    <Text
      key={index}
      style={[styles.cell, isFocused && styles.focusCell]}
      onLayout={getCellOnLayoutHandler(index)}>
      {textChild}
    </Text>
  );
};


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
  <SafeAreaView style={styles.root}>
  <Text style={styles.title}>Enter Pin</Text>
  <View style={styles.fieldRow}>
  <Text style={styles.toggle} onPress={toggleMask}>
      {enableMask ? '👁️' : '👁️'}
    </Text>
    <CodeField
      ref={ref}
      {...props}
      value={inputPin}
      onChangeText={setInputPin}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={renderCell}
    />
    <Icon onPress={() => {authorizePinFromCardId()}}name="check-circle" size={60} />
  </View>
  
</SafeAreaView>
  );
};