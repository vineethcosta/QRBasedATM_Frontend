import React , {useState} from  'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import {TextInput,HelperText, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Deposit({route,navigation}) {
  const { cardId } = route.params;
  const [output, setOutput] = useState("");
  const [amount, setAmount] = React.useState('');
  const onChangeAmount = amount => setAmount(amount);
  const [isVisible, setVisible] = useState(false)

  const hasErrors = () => {
    if(amount=="0" || amount.includes('-') || amount.length==0 )
      return 1;
    else{
      return 0;
    }
  }

  const setDepositCompleted=()=>{
    console.log(cardId+ "hi1")
    fetch('https://qrbasedatm.herokuapp.com/setDepositCompleted',{
      method : "POST",
      headers : {
          'Content-type': 'application/json',
          'authorization': cardId
      }
    })
    .then((res) => res.text())
    .then((responseJson) =>{
      console.log(responseJson+"hi2")
    })
    .catch((err =>{
      console.log(err+"h14")
    }));
  }


  const depositAmount=()=>{
      setDepositCompleted();
      fetch('https://qrbasedatm.herokuapp.com/deposit',{
        method : "POST",
        headers : {
            'Content-type': 'application/json',
            'authorization': cardId
        },
        body:JSON.stringify({
          "amount":amount
        })
      })
      .then(res => res.json())
      .then(data =>{
        if(data.TransactionDetails!=null){
          setOutput("Amount Deposited: ₹ " + data.TransactionDetails.transactionAmount)
          console.log(data)
        }
       setVisible(true)
      }) 
    .catch(err=>{
      console.log(err)
  })
}

 return (
    <View style={styles.container}>
      <TextInput  style={styles.input}  keyboardType={'numeric'} value = {amount} label="Amount to Deposit" value={amount} onChangeText={onChangeAmount} />
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style = {styles.container}>
        <Text style = {{ fontSize: 20, margin:40 , textAlign:'center'}}>{output}</Text>
        <Icon name="check-circle" size={60} onPress= {() => navigation.navigate('ScanQRCodeScreen')} />
        </View>
        </View>
      </Modal>
      <Icon  style={{alignItems:"center"}} onPress={() => depositAmount()} name="check-circle" size={60} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 300,
    backgroundColor: '#ecf0f1',
    marginRight: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});