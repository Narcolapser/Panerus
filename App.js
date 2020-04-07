import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';
import { Gatra } from './gatra.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Irama ciblon</Text>
      <div>
        <Gatra notes="2 3 2 7"></Gatra>
        <Gatra notes="3 2 7 6"></Gatra>
        <Gatra notes="2 3 2 76"></Gatra>
        <Gatra notes="72 35 65 3"></Gatra>
      </div>
      <div>
        <Gatra notes="6 7 3 2"></Gatra>
        <Gatra notes="6 3 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="5 3 2 7"></Gatra>
      </div>
      <div>
        <Gatra notes="6 7 3 2"></Gatra>
        <Gatra notes="6 3 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="· 7 5 6"></Gatra>
      </div>
      <div>
        <Gatra notes="5 3 5 3"></Gatra>
        <Gatra notes="7 6 2 7"></Gatra>
        <Gatra notes="3 5 3 2"></Gatra>
        <Gatra notes="· 7 5 6"></Gatra>
      </div>
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
