import React , {useState} from  'react';
import { Modal, Text, View } from 'react-native';
import {TextInput,HelperText, Button} from 'react-native-paper';

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
          setOutput("Amount Deposited:" + data.TransactionDetails.transactionAmount)
          console.log(data)
        }
       setVisible(true)
      }) 
    .catch(err=>{
      console.log(err)
  })
}

const redirectToScanQRCode=()=>{
  fetch('https://qrbasedatm.herokuapp.com/deleteSyncOnTransactionCompleted',{
    method : "POST",
    headers : {
        'Content-type': 'application/json',
        'authorization': cardId
    },
  })
  .then(res => res.json())
  .then(data =>{
    if(data!=null){
      console.log("Deleted SyncTransaction");
      navigation.navigate('ScanQRCodeScreen');
    }
  }) 
.catch(err=>{
  console.log(err)
})
}
 return (
    <View>
      <TextInput keyboardType={'numeric'} value = {amount} label="Amount to Deposit" value={amount} onChangeText={onChangeAmount} />
      <HelperText type="error" visible={hasErrors()}>
        Enter valid amount to be deposited
      </HelperText>
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style = {{backgroundColor:"#ffffff", height: 10,marginLeft:20, marginRight:20,marginTop:275,marginBottom:275,padding:20, borderRadius:20, flex: 1}}>
        <Text style = {{ fontSize: 30, margin:40 , textAlign:'center'}}>{output}</Text>
        <Button mode="contained" onPress= {()=>redirectToScanQRCode()}>OK</Button>
        </View>
        </View>
      </Modal>
      <Button onPress={() => depositAmount()}>Deposit</Button>
    </View>
  );
};
