import React from 'react';
//import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View } from 'react-native';
import { Gatra } from './gatra.js';

export default function App() {
  let lines = [];
  // RNFS.readFile('irama_ciblon.pan','ascii').then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.log(err.message, err.code);
  // })
  return (
    <View style={styles.container}>
      <Text>Irama ciblon</Text>
      <View>
        <Gatra notes="2 3 2 7"></Gatra>
        <Gatra notes="3 2 7 6"></Gatra>
        <Gatra notes="2 3 2 76"></Gatra>
        <Gatra notes="72 35 65 3"></Gatra>
      </View>
      <View>
        <Gatra notes="6 7 3 2"></Gatra>
        <Gatra notes="6 3 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="5 3 2 7"></Gatra>
      </View>
      <View>
        <Gatra notes="6 7 3 2"></Gatra>
        <Gatra notes="6 3 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="· 7 5 6"></Gatra>
      </View>
      <View>
        <Gatra notes="5 3 5 3"></Gatra>
        <Gatra notes="7 6 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="· 7 5 6"></Gatra>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gatra: {
    flex: 1,
    backgroundColor: '#ccc',
    margin: '10px'
  }
});
