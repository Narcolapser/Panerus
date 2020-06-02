import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet } from 'react-native';
import * as RNFS from 'react-native-fs';

export function SongScreen({route, navigation}) {
  const { path } = route.params;
  let [content, setContent] = React.useState('Saron 1: 0a 1a 2a 3a\t0b 1b 2b 3b\t0c 1c 2c 3c\t0d 1d 2d 3d\nSaron 1: 0e 1e 2e 3e\t0f 1f 2f 3f\t0g 1g 2g 3g\t0h 1h 2h 3h\nSaron 1: 0i 1i 2i 3i\t0j 1j 2j 3j\t0k 1k 2k 3k\t0l 1l 2l 3l\nSaron 1: 0m 1m 2m 3m\t0n 1n 2n 3n\t0o 1o 2o 3o\t0p 1p 2p 3p');
  let onChange = (passage, value) => {
    console.log('Updating the ' + passage + ' passage to ' + value);
    setContent(value);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Title: { path }</Text>
      </View>
      <Passage content={content} onChange={(value) => {onChange(0,value)}}></Passage>
    </View>
  );
}

function Passage(props){
  let str_lines = props.content.split('\n');
  let lines = [];
  let onChange = (line, value) => {
      console.log('Updating the line ' + line + ' line to ' + value);
      let lines = props.content.split('\n');
      lines[line] = value;
      console.log('Updating passage to: ' + lines.join('\t'));
      props.onChange(lines.join('\n'));
  }

  for(let i = 0; i < str_lines.length; i ++)
    lines.push(Line({content: str_lines[i], onChange:(value) => {onChange(i,value)}}));
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
  let onChange = (gatra, value) => {
    console.log('Updating the ' + gatra + ' gatra to ' + value);
    let gatras = props.content.split('\t');
    gatras[gatra] = value;
    console.log('Updating line to: ' + gatras.join('\t'));
    props.onChange(gatras.join('\t'));
  }

  for(let i = 0; i < str_gatras.length; i++)
    gatras.push(Gatra({content: str_gatras[i], onChange:(value) => {onChange(i,value)}}));

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
  let onChange = (note, value) => {
    console.log('Updating the ' + note + ' note to ' + value);
    let gatra = props.content.split(' ');
    gatra[note] = value;
    console.log('Updating gatra to: ' + gatra.join(' '));
    props.onChange(gatra.join(' '));
  }
  for(let i = 0; i<str_notes.length; i++)
    notes.push(Note({content: str_notes[i], onChange:(value) => {onChange(i,value)}}));
  return (
    <View style={{flexDirection:'row'}}>
      { notes }
    </View>
  )
}

function Note(props)
{
  const [selector_open, set_selector_open] = React.useState(false);
  let handle_press = () => {
    console.log('received press on: ' + props.content);
    console.log('Selector was: ' + selector_open);
    set_selector_open(!selector_open);
    console.log('Selector is: ' + selector_open);
  };
  let change_note = (side,value) => {
    if (side == 'left')
      if (props.content.length == 1)
        props.onChange(value);
      else
        props.onChange(value + props.content[1]);
    else
      props.onChange(props.content[0] + value);
console.log('Note changed: ' + value + ' : ' + side);
  }
  return (
    <View>
    <Modal
        animationType="slide"
        trasparent={true}
        visible={selector_open}
      >
        <View style={styles.container}>
          <View id="left_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button} onPress={() => change_note('left',' ')}/>
            <Button title="1" style={styles.button} onPress={() => change_note('left','1')}/>
            <Button title="2" style={styles.button} onPress={() => change_note('left','2')}/>
            <Button title="3" style={styles.button} onPress={() => change_note('left','3')}/>
            <Button title="4" style={styles.button} onPress={() => change_note('left','4')}/>
            <Button title="5" style={styles.button} onPress={() => change_note('left','5')}/>
            <Button title="6" style={styles.button} onPress={() => change_note('left','6')}/>
            <Button title="7" style={styles.button} onPress={() => change_note('left','7')}/>
            <Button title="·" style={styles.button} onPress={() => change_note('left','·')}/>
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text >{props.content}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={handle_press} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button} onPress={() => change_note('right',' ')}/>
            <Button title="1" style={styles.button} onPress={() => change_note('right','1')}/>
            <Button title="2" style={styles.button} onPress={() => change_note('right','2')}/>
            <Button title="3" style={styles.button} onPress={() => change_note('right','3')}/>
            <Button title="4" style={styles.button} onPress={() => change_note('right','4')}/>
            <Button title="5" style={styles.button} onPress={() => change_note('right','5')}/>
            <Button title="6" style={styles.button} onPress={() => change_note('right','6')}/>
            <Button title="7" style={styles.button} onPress={() => change_note('right','7')}/>
            <Button title="·" style={styles.button} onPress={() => change_note('right','·')}/>
          </View>
        </View>
      </Modal>
      <TouchableNativeFeedback onPress={handle_press}>
        <Text style={{minWidth:25}}>{props.content}</Text>
      </TouchableNativeFeedback>
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
