import React, {useState} from 'react';
import {  View, Modal, StyleSheet } from 'react-native';
import {TextInput,Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
              setBalance("Balance: ₹ "+responseJson.accountDetails.balance)
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
    <View style={styles.container}>
      <Modal transparent={true} visible= {isVisible} >
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
        <View style = {{backgroundColor:"#ffffff", height: 10,marginLeft:20, marginRight:20,marginTop:275,marginBottom:275,padding:20, borderRadius:20, flex: 1 , alignItems:"center"}}>
        <Text style = {{ fontSize: 20, margin:40 , textAlign:'center', alignItems:"center"}}>{balance}</Text>
        <Icon name="check-circle" size={60}  onPress= {()=>redirectToScanQRCode()}  />
        </View>
        </View>
      </Modal>
      <Icon  style={{alignItems:"center"}} onPress= {fetchBalance} name="check-circle" size={60} />
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