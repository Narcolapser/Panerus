import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, save_song, requestExternalWrite, export_song} from './pan_file.js';
import {Note_Selector} from './note_selector.js'
import {Passage} from './passage.js'
import {Line} from './line.js'
import {Note} from './note.js'

export function EditableLabel(props)
{
  let edit_label = () =>
  {
    props.edit(props.id);
  }
  return (
    <View>
      <TouchableNativeFeedback onPress={edit_label}>
        <Text>{props.content}</Text>
      </TouchableNativeFeedback>
    </View>
  )
}

export function Label_Editor(props)
{
  return (
    <Modal
        animationType="slide"
        trasparent={true}
        visible={props.visible}
      >
        <View>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={text => props.update(text)}>{props.content}</TextInput>
        <Button title='ok' onPress={props.close}></Button>
        </View>
      </Modal>
  )
}
