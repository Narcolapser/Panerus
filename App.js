import React from 'react';
import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View } from 'react-native';
import { Gatra } from './gatra.js';

export default function App() {
  let lines = [];
  // RNFS.readFile('irama_ciblon.pan','ascii').then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.log(err.message, err.code);
  // })
  var RNFS = require('react-native-fs');
  let results = RNFS.DocumentDirectoryPath;
  results = RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) =>{return result});
  console.log(results);

  return (
    <View style={styles.root}>
      <Text>{JSON.stringify(results)}</Text>
      <Text>Irama ciblon5</Text>
      <View style={styles.container}>
        <View style={styles.gatra}>
          <Gatra notes="2 3 2 7"></Gatra>
          <Gatra notes="3 2 7 6"></Gatra>
          <Gatra notes="2 3 2 76"></Gatra>
          <Gatra notes="72 35 65 3"></Gatra>
        </View>
        <View style={styles.gatra}>
          <Gatra notes="6 7 3 2"></Gatra>
          <Gatra notes="6 3 2 7"></Gatra>
          <Gatra notes="3 5 3 2"></Gatra>
          <Gatra notes="5 3 2 7"></Gatra>
        </View>
        <View style={styles.gatra}>
          <Gatra notes="6 7 3 2"></Gatra>
          <Gatra notes="6 3 2 7"></Gatra>
          <Gatra notes="3 5 3 2"></Gatra>
          <Gatra notes="· 7 5 6"></Gatra>
        </View>
        <View style={styles.gatra}>
          <Gatra notes="5 3 5 3"></Gatra>
          <Gatra notes="7 6 2 7"></Gatra>
          <Gatra notes="3 5 3 2"></Gatra>
          <Gatra notes="· 7 5 6"></Gatra>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  gatra: {
    backgroundColor: '#ccc',
    flexDirection:'row',
    flexWrap:'wrap'
  }
});
