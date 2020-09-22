import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, save_song, requestExternalWrite, export_song} from './pan_file.js';
import {Note_Selector} from './note_selector.js'
import {Note} from './note.js'

export function Line(props)
{
  let edit_line = (note) => {
    props.edit({note: note});
  }

  let notes = [];

  // Transitionary method for translating existing given values into what note expects.
  for(let i = 0; i< props.content.length; i++)
  {
    let left = '';
    let right = '';
    if(props.content[i].length == 1)
      left = props.content[i]
    else {
      left = props.content[i][0]
      right = props.content[i][1]
    }
    notes.push(
        <Note note={{left:left,right:right}} key={i} edit={() => edit_line(i)}/>
    )
  }

  let instrument = '';
  if (props.content.instrument && props.content.instrument != '')
    instrument = props.instrument + ' :';

  return (
    <View style={styles.container}>
      <Text >{instrument}</Text>
      { notes }
    </View>
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
