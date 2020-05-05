
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

    this.toggle_menu = this.toggle_menu.bind(this);

  }
  handleClickOutside(){
    this.setState({
      menuOpen: false
    })
  }
  toggle_menu(){
    console.log('note pressed');
    this.setState({modalVisible: !this.state.modalVisible});
  }
  change_note(side, value){
    if (side == 'left')
      if (this.props.notes.length == 1)
        this.props.onChange(value);
      else
        this.props.onChange(value + this.props.notes[1]);
    else
      this.props.onChange(this.props.notes[0] + value);
    console.log('Note changed: ' + value + ' : ' + side);
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
            <Button title="␣" style={styles.button} onPress={() => this.change_note('left',' ')}/>
            <Button title="1" style={styles.button} onPress={() => this.change_note('left','1')}/>
            <Button title="2" style={styles.button} onPress={() => this.change_note('left','2')}/>
            <Button title="3" style={styles.button} onPress={() => this.change_note('left','3')}/>
            <Button title="4" style={styles.button} onPress={() => this.change_note('left','4')}/>
            <Button title="5" style={styles.button} onPress={() => this.change_note('left','5')}/>
            <Button title="6" style={styles.button} onPress={() => this.change_note('left','6')}/>
            <Button title="7" style={styles.button} onPress={() => this.change_note('left','7')}/>
            <Button title="·" style={styles.button} onPress={() => this.change_note('left','·')}/>
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text >{this.props.notes}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={this.toggle_menu} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button} onPress={() => this.change_note('right',' ')}/>
            <Button title="1" style={styles.button} onPress={() => this.change_note('right','1')}/>
            <Button title="2" style={styles.button} onPress={() => this.change_note('right','2')}/>
            <Button title="3" style={styles.button} onPress={() => this.change_note('right','3')}/>
            <Button title="4" style={styles.button} onPress={() => this.change_note('right','4')}/>
            <Button title="5" style={styles.button} onPress={() => this.change_note('right','5')}/>
            <Button title="6" style={styles.button} onPress={() => this.change_note('right','6')}/>
            <Button title="7" style={styles.button} onPress={() => this.change_note('right','7')}/>
            <Button title="·" style={styles.button} onPress={() => this.change_note('right','·')}/>
          </View>
        </View>
      </Modal>
      <TouchableNativeFeedback onPress={this.toggle_menu}>
        <View className="dd-header-title"><Text>{this.props.notes}</Text></View>
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
