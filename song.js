import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet } from 'react-native';
import * as RNFS from 'react-native-fs';

export function SongScreen({route, navigation}) {
  const { path } = route.params;
  let content = 'Saron 1: 0a 1a 2a 3a\t0b 1b 2b 3b\t0c 1c 2c 3c\t0d 1d 2d 3d\nSaron 1: 0e 1e 2e 3e\t0f 1f 2f 3f\t0g 1g 2g 3g\t0h 1h 2h 3h\nSaron 1: 0i 1i 2i 3i\t0j 1j 2j 3j\t0k 1k 2k 3k\t0l 1l 2l 3l\nSaron 1: 0m 1m 2m 3m\t0n 1n 2n 3n\t0o 1o 2o 3o\t0p 1p 2p 3p';
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Title: { path }</Text>
      </View>
      <Passage content={content}></Passage>
    </View>
  );
}

function Passage(props){
  let str_lines = props.content.split('\n');
  let lines = [];
  for(let i = 0; i < str_lines.length; i ++)
    lines.push(Line({content: str_lines[i]}));
  return (
    <View >
      {lines}
    </View>
    )
}

function Line(props)
{
  let line = props.content.split(':');
  let instrument = line[0];
  let str_gatras = line[1].split('\t');
  let gatras = [];
  for(let i = 0; i < str_gatras.length; i++)
    gatras.push(Gatra({content: str_gatras[i]}));

  return (
    <View style={{flexDirection:'row'}}>
      <Text >{instrument}</Text>
      {gatras}
    </View>
  )
}

function Gatra(props)
{
  let str_notes = props.content.split(' ');
  let notes = [];
  for(let i = 0; i<str_notes.length; i++)
    notes.push(Note({content: str_notes[i]}));
  return (
    <View style={{flexDirection:'row'}}>
      { notes }
    </View>
  )
}

function Note(props)
{
  return (
    <Text style={{minWidth:25}}>{props.content}</Text>
  )
}
