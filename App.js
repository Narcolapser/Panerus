import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';
import { Measure } from './measure.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Test of app.</Text>
      <Measure></Measure>
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
});
