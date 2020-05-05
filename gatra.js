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

  update_note(note, value)
  {
    console.log('Updating the ' + note + ' to ' + value);
  }
  render(){
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 25, float: 'left'}}>
      <Note notes={this.state.notes[0]} onChange={(value) => this.update_note(0,value)}></Note>
      <Note notes={this.state.notes[1]} onChange={(value) => this.update_note(1,value)}></Note>
      <Note notes={this.state.notes[2]} onChange={(value) => this.update_note(2,value)}></Note>
      <Note notes={this.state.notes[3]} onChange={(value) => this.update_note(3,value)}></Note>
    </View>
  )}
}
