import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var example = `# Asmaradana

## Buka
· 3 · 2	· 3 · 2	3 3 2 2	· 7 · 6

## Irama Lancar
2 7 2 6	2 7 2 3	5 3 2 7	3 2 3 7
6 3 2 7	3 2 7 6	5 3 2 7	3 2 7 6

## Irama Chiblon
2 3 2 7	3 2 7 8	2 3 2 76	72 35 65 3
6 7 3 2	6 3 2 7	3 5 3 2	5 3 2 7
6 7 3 2	6 3 2 7	3 5 3 2	· 7 5 6
5 3 5 3	7 6 2 7	3 5 3 2	· 7 5 6`

let defaultLine = '1 2 3 4\t1 2 3 4\t1 2 3 4\t1 2 3 4';

function parse_song(str)
{
  let parts = str.split('##');
  let title = parts.splice(0,1)[0].substring(2);
  while(title.includes('\n'))
    title = title.replace('\n','');
  let passages = [];
  for(let i = 0; i < parts.length; i++)
  {
    let passage_parts = parts[i].split('\n');
    let passage_title = passage_parts.splice(0,1);
    let instrument = '';
    let instruments = [];
    let lines = [];
    for(let j = 0; j < passage_parts.length; j++)
    {
      if (passage_parts[j].includes('###'))
      {// Start of a new  instrument.
        if (instrument != '')
        {
          instruments.push({instrument:instrument,lines:lines})
          lines = [];
        }
        instrument = passage_parts[j];
      }
      else if (passage_parts[j].includes('\t'))// line of music.
        lines.push(passage_parts[j]);
      // No else, if it is not a instrument or a line it's a blank line.
    }
    instruments.push({instrument:instrument,lines:lines});
    passages.push({title: passage_title, instruments:instruments});
  }
  return {passages:passages,title:title};
}

export function SongScreen({route, navigation}) {
  const { path } = route.params;
  let [content, setContent] = React.useState(parse_song(example));
  let onChange = (passage, value) => {
    console.log('Final saving');
    console.log(content);
    console.log('Updating the ' + passage + ' passage to ' + value);
    let new_content = JSON.parse(JSON.stringify(content));
    new_content['passages'][value] = passage;
    console.log(new_content);
    setContent(new_content);
  }
  let passages = []
  for(let i = 0; i < content['passages'].length; i++)
    passages.push(
      Passage({content: content['passages'][i]['instruments'][0],
               title: content['passages'][i]['title'],
               onChange: (value) => {onChange(0,value)}}));

  let addPassage = () => {
    let new_content = JSON.parse(JSON.stringify(content));
    console.log(new_content);
    new_content['passages'].push({title:'new passage',instruments:[{instrument:'',lines:[defaultLine]}]});
    console.log(new_content);
    console.log("Saving now");
    setContent(new_content);
    console.log("Done");
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Title: { content['title'] }</Text>
        </View>
        {passages}
      </View>
      <Button title="Add passage" onPress={addPassage}><Icon name="plus-circle-outline"/></Button>
    </ScrollView>
  );
}

function Passage(props){
  let str_lines = props.content.lines;
  let lines = [];
  let onChange = (line, value) => {
      console.log('Updating the line ' + line + ' line to ' + value);
      let lines = props.content.lines;
      lines[line] = value;
      console.log('Updating passage to: ' + lines.join('\t'));
      props.onChange(lines.join('\n'));
  }
  let addLine = () => {
    let lines = props.content.lines;
    lines.push(defaultLine);
    console.log("adding line:");
    console.log(lines);
    props.onChange(lines.join('\n'));
  }
  for(let i = 0; i < str_lines.length; i ++)
    lines.push(Line({content: str_lines[i], instrument: props.content.instrument, onChange:(value) => {onChange(i,value)}}));
  return (
    <View >
      <Text>{props.title}</Text>
      {lines}
      <Button title="Add line" onPress={addLine}><Icon name="plus-circle-outline"/></Button>
      <Text></Text>
    </View>
    )
}

function Line(props)
{
  let str_gatras = props.content.split('\t');
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

  let instrument = '';
  if (props.content.instrument && props.content.instrument != '')
    instrument = props.instrument + ' :';

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
