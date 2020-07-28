import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import {Card, Button} from 'react-native-paper'

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
    <View>
      <Card>   
    <Card.Actions style={{alignItems:'center', justifyContent: 'center'}} >
      <Button mode="contained" style={{width:400, height: 25, backgroundColor : 'green',justifyContent: 'center' }} onPress={() => navigation.navigate('Withdraw',{cardId: cardId})}> Withdraw </Button>
    </Card.Actions>
  </Card>
  <Card>
    <Card.Cover />
    <Card.Actions style={{alignItems:'center', justifyContent: 'center'}}>
      <Button mode="contained" style={{width:400, height: 25, backgroundColor : 'green', justifyContent: 'center'}} onPress={()  => navigation.navigate('Deposit',{cardId: cardId})}>Deposit</Button>
    </Card.Actions>
  </Card> 
  <Card>
    <Card.Cover />
    <Card.Actions style={{alignItems:'center', justifyContent: 'center'}}>
      <Button mode="contained"  style={{width:400, height: 25 , backgroundColor : 'green', justifyContent: 'center'}} onPress={()  => navigation.navigate('BalanceEnquiry',{cardId: cardId})}>Balance Enquiry</Button>
    </Card.Actions>
    </Card>
    </View>
  );
}
