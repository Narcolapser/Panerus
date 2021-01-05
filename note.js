import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Note(props)
{
  // Initialize empty values.
  let left_d = '';
  let left = '';
  let right_d = '';
  let right = '';

  // Check for item in the note object and populate the local value if it is there.

  if ('left_diacritic' in props.note)
    left_d = props.note['left_diacritic']
  if ('left' in props.note)
    left = props.note['left']
  if ('right_diacritic' in props.note)
    right_d = props.note['right_diacritic']
  if ('right' in props.note)
    right = props.note['right']

  // Diacritics are not to be rendered if the note it is for is not there.
  if (left == '')
    left_d = ''
  if (right == '')
    right_d = ''

  // let passage = props.passage;
  // let line = props.line;
  // let key = props.key;
  // console.log("Note Locator:" + passage + line + key);

  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={() => {console.log('Note Pressed');props.edit(props.passage, props.line, props.key);}}>
        <Text style={{ fontFamily: 'kepatihan' }} >{left_d}{left}{right_d}{right}</Text>
      </TouchableOpacity>
    </View>
  )
}
