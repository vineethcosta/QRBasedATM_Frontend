import React , {useState} from  'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import {TextInput,HelperText, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function Withdraw({route,navigation}) {
  const  {cardId}  = route.params;
  const [output, setOutput] = useState("");
  const [amount, setAmount] = React.useState('');
  const onChangeAmount = amount => setAmount(amount);
  const [isVisible, setVisible] = useState(false)


  const hasErrors = () => {
    if(amount=="0" || amount.includes('-') || amount.length==0)
      return 1;
    else{
      return 0;
    }
  }

  const setWithdrawCompleted=()=>{
    fetch('https://qrbasedatm.herokuapp.com/setWithdrawCompleted',{
      method : "POST",
      headers : {
          'Content-type': 'application/json',
          'authorization': cardId
      }
    })
    .then((res) => res.text())
    .then((responseJson) =>{
      console.log(responseJson+"hi2 Withdraw")
    })
    .catch((err =>{
      console.log(err+"h14")
    }));
  }


  const withdrawAmount=()=>{
      setWithdrawCompleted();
      fetch('https://qrbasedatm.herokuapp.com/withdraw',{
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
        if(data!=null){
          setOutput("Amount Withdrawn: ₹ " + data.TransactionDetails.transactionAmount)
          console.log(data.TransactionDetails.transactionAmount+"withdraw22")
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
    <View style={styles.container}>
      <TextInput   style={styles.input}  keyboardType={'numeric'} label="Amount to Withdraw" value={amount} onChangeText={onChangeAmount} />
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style={styles.container}>
        <Text style = {{ fontSize: 20, margin:40 , textAlign:'center'}}>{output}</Text>
        <Icon name="check-circle" size={60} onPress= {()=>redirectToScanQRCode()} />
        </View>
        </View>
      </Modal>
      <Icon style={{alignItems:"center"}} onPress={() => withdrawAmount()} name="check-circle" size={60} />
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