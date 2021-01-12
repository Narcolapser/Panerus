import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, save_song, requestExternalWrite, export_song} from './pan_file.js';
import {Note_Selector} from './note_selector.js'
import {Note} from './note.js'

export function Line(props)
{
  let notes = [];

  for(let i = 0; i< props.content.length; i++)
  {
    notes.push(Note({passage:props.passage,
                     line:props.key,
                     note:props.content[i],
                     key:i,
                     edit:props.edit}));
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
