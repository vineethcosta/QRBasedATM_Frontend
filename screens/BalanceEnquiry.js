import React, {useState} from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import {TextInput,Text, Button} from 'react-native-paper';
export default function BalanceEnquiry({route,navigation}) {
 const  {cardId}  = route.params;
 const [balance, setBalance] = useState("");
 const [isVisible, setVisible] = useState(false)


 const setBalanceEnquiryCompleted=()=>{
  console.log(cardId+ "hi1")
  fetch('https://qrbasedatm.herokuapp.com/setBalanceEnquiryCompleted',{
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

  const fetchBalance=()=>
  {
        setBalanceEnquiryCompleted();
        fetch('https://qrbasedatm.herokuapp.com/balanceEnquiry',{
          method : "GET",
          headers : {
              'Content-type': 'application/json',
              'authorization': cardId
          }}
          ).then((res) => res.json())
          .then((responseJson) =>{
            console.log(responseJson)
            if(responseJson.accountDetails!=null){
              setBalance("Balance:"+responseJson.accountDetails.balance)
            }
            setVisible(true)
          })
          .catch((err =>{
            setBalance(err)
            console.log(err)
          }));
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
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style = {{backgroundColor:"#ffffff", height: 10,marginLeft:20, marginRight:20,marginTop:275,marginBottom:275,padding:20, borderRadius:20, flex: 1}}>
        <Text style = {{ fontSize: 30, margin:40 , textAlign:'center'}}>{balance}</Text>
        <Button mode="contained"  onPress= {()=>redirectToScanQRCode()}>OK</Button>
        </View>
        </View>
      </Modal>
      <Button mode="contained" onPress= {fetchBalance}>Populate</Button>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
});
