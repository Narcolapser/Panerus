
import React from 'react';
//import onClickOutside from "react-onclickoutside";
import { StyleSheet, Text, View, Modal, TouchableNativeFeedback } from 'react-native';

export class Note extends React.Component {
  constructor(props) {
    super(props)
    let left = '·';
    let right = ' ';
    if (props.notes)
    {
      if (props.notes.length == 2)
      {
        left = props.notes[0]
        right = props.notes[1]
      }
      else {
        left = props.notes[0]
      }
    }
    this.state = {
      left_diacritic: '',
      left_note: left,
      right_note: right,
      right_diacritic: '',
      notes: '',
      menuOpen: false,
      modalVisible: false
    }
  }
  handleClickOutside(){
    this.setState({
      menuOpen: false
    })
  }
  toggleMenu(self){
    console.log('note pressed');
    console.log(self);
    self.setState({modalVisible: true});
  }
  select_note(val){
    this.setState({
      menuOpen: false,
      left_note: val,
      notes: val
    })
  }
  render(){
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 25, float: 'left'}}>
      <Modal
        animationType="slide"
        trasparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {Alert.alert("Modal has been closed.");
      }}>
        <Text>Modal Text</Text>
      </Modal>
      <TouchableNativeFeedback onPress={this.toggleMenu(this)}>
        <View className="dd-header-title"><Text>{this.state.left_note}{this.state.right_note}</Text></View>
      </TouchableNativeFeedback>
    </View>
  )}
}
