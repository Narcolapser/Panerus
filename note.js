
import React from 'react';
//import onClickOutside from "react-onclickoutside";
import { StyleSheet, Text, View, Modal, TouchableNativeFeedback, Button } from 'react-native';

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

    this.toggleMenu = this.toggleMenu.bind(this)
  }
  handleClickOutside(){
    this.setState({
      menuOpen: false
    })
  }
  toggleMenu(){
    console.log('note pressed');
    this.setState({modalVisible: !this.state.modalVisible});
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
      >
        <View style={styles.container}>
          <View id="left_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button}/>
            <Button title="1" style={styles.button}/>
            <Button title="2" style={styles.button}/>
            <Button title="3" style={styles.button}/>
            <Button title="4" style={styles.button}/>
            <Button title="5" style={styles.button}/>
            <Button title="6" style={styles.button}/>
            <Button title="7" style={styles.button}/>
            <Button title="·" style={styles.button}/>
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text >{this.state.left_note}</Text>
              <Text >{this.state.right_note}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={this.toggleMenu} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button}/>
            <Button title="1" style={styles.button}/>
            <Button title="2" style={styles.button}/>
            <Button title="3" style={styles.button}/>
            <Button title="4" style={styles.button}/>
            <Button title="5" style={styles.button}/>
            <Button title="6" style={styles.button}/>
            <Button title="7" style={styles.button}/>
            <Button title="·" style={styles.button}/>
          </View>
        </View>
      </Modal>
      <TouchableNativeFeedback onPress={this.toggleMenu}>
        <View className="dd-header-title"><Text>{this.state.left_note}{this.state.right_note}</Text></View>
      </TouchableNativeFeedback>
    </View>
  )}
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
    flex: 1
  },
  selector: {
    flex: 1
  },
  center_display: {
    flex: 2
  },
  note_display: {
    flex: 2,
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  note_holder: {
    flex: 1
  },
  button: {
    flex: 1
  }
});
