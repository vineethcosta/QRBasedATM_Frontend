import React from 'react';
import { Text, Alert,StyleSheet, View } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
export default function HomeScreen({navigation,route}) {
  // const hasUnsavedChanges = Boolean(text);
  // const [text, setText] = React.useState('');
  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       e.preventDefault();
  //       Alert.alert(
  //         'Cant Go back',
  //         'You have entered correct PIN. Going back would destroy the session',
  //         [
  //           { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //         ]
  //       );
  //     }),
  //   [navigation, hasUnsavedChanges]
  // );

  const { cardId } = route.params;

  return ( 
    <View style = {styles.container}>
      <AwesomeButtonRick style = {{marginTop:20}} onPress={() => navigation.navigate('Withdraw',{cardId: cardId})}>
        <Text style={{width:200,textAlign:'center'}}>WITHDRAW</Text> 
      </AwesomeButtonRick>
      <AwesomeButtonRick style = {{marginTop:20}} onPress={()  => navigation.navigate('Deposit',{cardId: cardId})}>
        <Text style={{width:200,textAlign:'center'}}>DEPOSIT</Text>
      </AwesomeButtonRick>
      <AwesomeButtonRick style = {{marginTop:20}} onPress={()  => navigation.navigate('BalanceEnquiry',{cardId: cardId})}>
        <Text style={{width:200,textAlign:'center'}}>BALANCE</Text>
      </AwesomeButtonRick>
      <AwesomeButtonRick style = {{marginTop:20}} >
        <Text style={{width:200,textAlign:'center'}}>CHANGE PIN</Text>
      </AwesomeButtonRick>
      <AwesomeButtonRick  style = {{marginTop:20}}>
        <Text style={{width:200,textAlign:'center'}}>MINI STATEMENT</Text>
      </AwesomeButtonRick>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
});