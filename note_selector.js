import * as React from 'react';
import { Button, View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

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
  let format_note = (side,value) =>
  {
    if (value == '␣')
      value = ' ';
		let new_value = '';
    if (side == 'left')
      if (props.content.length == 1)
        new_value = value;
      else
        new_value = value + props.content[1];
    else
      new_value = props.content[0] + value;
		props.change_note(new_value);
  }

  let notes = ['␣','1','2','3','4','5','6','7','·'];
  let left_buttons = [];
  for(let i = 0; i < notes.length; i++)
    left_buttons.push(<Button title={notes[i]} style={styles.button} onPress={() => format_note('left',notes[i])}/>)
  let right_buttons = [];
  for(let i = 0; i < notes.length; i++)
    right_buttons.push(<Button title={notes[i]} style={styles.button} onPress={() => format_note('right',notes[i])}/>)

  let diacritics = ['','g','n','8'];
  let left_diacritics = [];
  for(let i = 0; i < diacritics.length; i++)
    left_diacritics.push(<Selector_Button title={diacritics[i] + props.content[0]} titleStyle={styles.button} onPress={() => format_note('left',diacritics[i])}/>)
  let right_diacritics = [];
  let right_holder = '·'
  if (props.content.length > 1)
    right_holder = props.content[1]
  for(let i = 0; i < diacritics.length; i++)
    right_diacritics.push(<Selector_Button title={diacritics[i] + right_holder} style={styles.button} onPress={() => format_note('left',diacritics[i])}/>)

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
          <View id="left_selectors" style={styles.selector}>
            { left_diacritics }
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text style={{ fontFamily: 'kepatihan' }} >g{props.content}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={props.close} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            { right_diacritics }
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
