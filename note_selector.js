import * as React from 'react';
import { Button, View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {Note} from './note.js'

function Selector_Button(props)
{
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <Text style={{fontFamily:'kepatihan'}}>{props.title}</Text>
      </TouchableOpacity>

    </View>
  );
}

export function Note_Selector(props)
{
  let notes = ['␣','1','2','3','4','5','6','7','·'];
  let left_buttons = [];
  for(let i = 0; i < notes.length; i++)
    left_buttons.push(<Button title={notes[i]} style={styles.button}/>)
  let right_buttons = [];
  for(let i = 0; i < notes.length; i++)
    right_buttons.push(<Button title={notes[i]} style={styles.button}/>)

  let diacritics = ['','g','n','8'];

  console.log('content')
  console.log(props.content);
  return (
    <Modal
        animationType="slide"
        trasparent={true}
        visible={props.visible}
      >
        <View style={styles.container}>
          <View id="left_selectors" style={styles.selector}>
            { left_buttons }
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text style={{ fontFamily: 'kepatihan' }} >{props.content.left} {props.content.right}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={props.close} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            { right_buttons }
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap',
    flex: 1
  },
  selector: {
    flex: 1,
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
    flex: 1,
    fontFamily:'kepatihan',
  }
});

// console dimensions: 49 high 230 wide.
