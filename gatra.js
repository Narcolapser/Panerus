import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';

export class Gatra extends React.Component {
  constructor(props) {
    super(props)
  }

  update_note(note, value)
  {
    console.log('Updating the ' + note + ' to ' + value);
    let gatra = this.props.notes.split(' ');
    gatra[note] = value;
    console.log('Updating gatra to: ' + gatra.join(' '));
    this.props.onChange(gatra.join(' '));
  }
  render(){
  let notes = this.props.notes.split(' ')
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 25, float: 'left'}}>
      <Note notes={notes[0]} onChange={(value) => this.update_note(0,value)}></Note>
      <Note notes={notes[1]} onChange={(value) => this.update_note(1,value)}></Note>
      <Note notes={notes[2]} onChange={(value) => this.update_note(2,value)}></Note>
      <Note notes={notes[3]} onChange={(value) => this.update_note(3,value)}></Note>
    </View>
  )}
}
