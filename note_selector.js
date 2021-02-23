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
  let note = props.content['passages'][props.focus.passage]['instruments'][0]['lines'][props.focus.line][props.focus.note]
  let update_note = (part,value) =>
  {
    if (value == '␣')
      value = ' ';
    let ret = {...note};
    ret[part] = value;
    console.log(ret);
    props.change_note(ret);
  }
  let notes = ['␣','1','2','3','4','5','6','7','·'];
  let left_buttons = [];
  for(let i = 0; i < notes.length; i++)
    left_buttons.push(<Button title={notes[i]} style={styles.button} onPress={() => update_note('left',notes[i])}/>)
  let right_buttons = [];
  for(let i = 0; i < notes.length; i++)
    right_buttons.push(<Button title={notes[i]} style={styles.button} onPress={() => update_note('right',notes[i])}/>)

  let diacritics = ['','g','n','p','j','b'];
  let ldb = [];
  for(let i = 0; i < diacritics.length; i++)
    ldb.push(<Selector_Button title={' '+diacritics[i] + note.left + ' '} style={styles.button}
      onPress={() => update_note('left_diacritic',diacritics[i])}/>)
  let rdb = [];
  for(let i = 0; i < diacritics.length; i++)
    rdb.push(<Selector_Button title={diacritics[i] + note.right} style={styles.button}
      onPress={() => update_note('right_diacritic',diacritics[i])}/>)

  let upper_octave = {'1':'!','2':'@','3':'#','4':'$','5':'%','6':'^','7':'&'};
  let lower_octave = {'1':'q','2':'w','3':'e','4':'r','5':'t','6':'y','7':'u'};

  let map_back = {'!':'1','@':'2','#':'3','$':'4','%':'5','^':'6','&':'7',
                  'q':'1','w':'2','e':'3','r':'4','t':'5','y':'6','u':'7',
                  '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7'};

  let left_value = map_back[note.left];
  let right_value = map_back[note.right];

  let left_up_octave_button = <Selector_Button title={upper_octave[left_value]} style={styles.button}
    onPress={() => update_note('left',upper_octave[left_value])}/>
  let left_no_octave_button = <Selector_Button title={left_value} style={styles.button}
    onPress={() => update_note('left',left_value)}/>
  let left_down_octave_button = <Selector_Button title={lower_octave[left_value]} style={styles.button}
    onPress={() => update_note('left',lower_octave[left_value])}/>
  let right_up_octave_button = <Selector_Button title={upper_octave[right_value]} style={styles.button}
    onPress={() => update_note('right',lower_octave[right_value])}/>
  let right_no_octave_button = <Selector_Button title={right_value} style={styles.button}
    onPress={() => update_note('right',right_value)}/>
  let right_down_octave_button = <Selector_Button title={lower_octave[right_value]} style={styles.button}
    onPress={() => update_note('right',lower_octave[right_value])}/>


  console.log('content')
  console.log(note);

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
            { ldb }
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" style={styles.note_display}>
              <Text style={{ fontFamily: 'kepatihan' }} >{note.left_diacritic}{note.left} {note.right_diacritic}{note.right}</Text>
            </View>
            <View style={styles.container}>
              <View id="note_display"  style={styles.center_display} >
                  {left_up_octave_button}
                  {left_no_octave_button}
                  {left_down_octave_button}
              </View>
              <View id="note_display"  style={styles.center_display} >
                  {right_up_octave_button}
                  {right_no_octave_button}
                  {right_down_octave_button}
              </View>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={props.close} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            { rdb }
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
    flex: 1,
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
