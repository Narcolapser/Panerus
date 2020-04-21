import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';

export class Gatra extends React.Component {
  constructor(props) {
    super(props)
    let notes = props.notes.split(' ')
    this.state = {
      notes:notes
    }
  }
  render(){
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 25, float: 'left'}}>
      <Note notes={this.state.notes[0]}></Note>
      <Note notes={this.state.notes[1]}></Note>
      <Note notes={this.state.notes[2]}></Note>
      <Note notes={this.state.notes[3]}></Note>
    </View>
  )}
}
