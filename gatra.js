import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';

export class Gatra extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 25, float: 'left'}}>
      <Note>1</Note>
    </View>
  )}
}
