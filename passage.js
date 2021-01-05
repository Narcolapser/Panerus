import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, save_song, requestExternalWrite, export_song} from './pan_file.js';
import {Note_Selector} from './note_selector.js'
import {Line} from './line.js'
import {EditableLabel, Label_Editor} from './editablelabel.js'

export function Passage(props){
  let str_lines = props.content.lines;
  let lines = [];

  let edit_passage = (line, obj) => {
    obj['line'] = line;
    props.edit(obj);
  }
  let addLine = () => {
    props.add_line(props.key);
  }
  for(let i = 0; i < str_lines.length; i ++)
    lines.push(Line({passage: props.key,
                     content: str_lines[i],
                     key: i,
                     instrument: props.content.instrument,
                     edit: props.edit}));

  return (
    <View style={{flex:1,width:"80%"}}>
      <EditableLabel content={props.title} edit={() => {props.edit_title(props.key)}} id='title'></EditableLabel>
      {lines}
      <Button title="Add line" onPress={props.edit}><Icon name="plus-circle-outline"/></Button>
      <Text></Text>
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
