import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, compile_song} from './pan_file.js';

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

let loading = '# loading'

//let defaultLine = '1 2 3 4\t1 2 3 4\t1 2 3 4\t1 2 3 4';
let defaultLine = [["4","3","2","1"],["4","3","2","1"],["4","3","2","1"],["4","3","2","1"]];

export function SongScreen({route, navigation}) {
  const { path } = route.params;
	let [show_modal, set_show_modal] = React.useState(false);
  let [note_locator, set_note_locator] = React.useState({passage:0,line:0,gatra:0,note:0});
	let [content, setContent] = React.useState(parse_song(loading));

	console.log(path);
	if (!path)
	{
		console.log('New song')
	}
	else
	{
		RNFS.readFile(path,'utf8')
		  .then((contents) => {
				setContent(parse_song(contents));
				console.log(content);
			})
			.catch((err) => {
				console.log(err.message, err.code);
			})
	}

  let edit_song = (passage, obj) => {
    obj.passage = passage;
    let line = obj['line'];
    let gatra = obj['gatra'];
    let note = obj['note'];
    set_note_locator(obj);
    set_show_modal(true);
  }

  let add_passage = () => {
    let new_content = JSON.parse(JSON.stringify(content));
    new_content['passages'].push({title:'new passage',instruments:[{instrument:'',lines:[defaultLine]}]});
    setContent(new_content);
  }

	let add_line = (passage) => {
		let new_content = JSON.parse(JSON.stringify(content));
		for(let i = 0; i < new_content['passages'][passage]['instruments'].length; i ++)
			new_content['passages'][passage]['instruments'][i]['lines'].push(defaultLine);
		setContent(new_content);
	}

  let change_note = (note) =>
  {
    content['passages'][note_locator.passage]['instruments'][0]['lines'][note_locator.line][note_locator.gatra][note_locator.note] = note;
    setContent(content);
  }

  let close_modal = () =>
  {
    set_show_modal(false);
  }

	let save_file = () =>
	{
		console.log(content['title']);
		let path = RNFS.DocumentDirectoryPath + '/' + content['title'] + '.pan';
		console.log(path)
		RNFS.writeFile(path,compile_song(content))
			.then((success) => {
				alert(content['title'] + ' was saved succesfully');
			})
			.catch((err) => {
				alert('Error saving file: ' + err.message);
			})
	}

  let passages = []
  for(let i = 0; i < content['passages'].length; i++)
    passages.push(
      Passage({content: content['passages'][i]['instruments'][0],
               title: content['passages'][i]['title'],
               key: i,
							 add_line: add_line,
               edit: (obj) => {edit_song(i,obj)}}));

  return (
    <View>
      <Note_Selector change_note={change_note} visible={show_modal} close={close_modal}
        content={content['passages'][note_locator.passage]['instruments'][0]['lines'][note_locator.line][note_locator.gatra][note_locator.note]}
      ></Note_Selector>
			<View style={{flexDirection: 'row'}}>
				<Button title="Save" onPress={save_file}></Button>
				<Button title="Preview"></Button>
				<Button title="Export"></Button>
			</View>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text>Title: { content['title'] }</Text>
          </View>
          {passages}
        </View>
        <Button title="Add passage" onPress={add_passage}><Icon name="plus-circle-outline"/></Button>
      </ScrollView>
    </View>
  );
}

function Passage(props){
  let str_lines = props.content.lines;
  let lines = [];

  let edit_passage = (line, obj) => {
    obj['line'] = line;
    props.edit(obj);
  }
  let addLine = () => {
    console.log("adding line:");
    props.add_line(props.key);
  }
  for(let i = 0; i < str_lines.length; i ++)
    lines.push(Line({content: str_lines[i], key: i, instrument: props.content.instrument, edit:(obj) => {edit_passage(i,obj)}}));
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
  let edit_line = (gatra, obj) => {
    obj['gatra'] = gatra;
    props.edit(obj);
  }

  let gatras = [];
  for(let i = 0; i <  props.content.length; i++)
    gatras.push(Gatra({content:  props.content[i], key: i, edit:(obj) => {edit_line(i,obj)}}));

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
  let edit_gatra = (note) => {
    props.edit({note: note});
  }
  let notes = [];
  for(let i = 0; i< props.content.length; i++)
    notes.push(Note({content: props.content[i], key: i, edit:() => {edit_gatra(i)}}));
  return (
    <View style={{flexDirection:'row'}}>
      { notes }
    </View>
  )
}

function Note(props)
{
  let handle_press = () => {
    console.log('received press on: ' + props.content);
    console.log('Selector was: ' + selector_open);
    console.log('Selector is: ' + selector_open);
  };

  return (
    <View>

      <TouchableNativeFeedback onPress={props.edit}>
        <Text style={{minWidth:25}}>{props.content}</Text>
      </TouchableNativeFeedback>
    </View>
  )
}

function Note_Selector(props)
{
  let format_note = (side,value) =>
  {
		let new_value = '';
    if (side == 'left')
      if (props.content.length == 1)
        new_value = value;
      else
        new_value = value + props.content[1];
    else
      new_value = props.content[0] + value;
		set_content(new_value);
		props.change_note(new_value);
  }
	let [content, set_content] = React.useState(props.content);
  return (
    <Modal
        animationType="slide"
        trasparent={true}
        visible={props.visible}
      >
        <View style={styles.container}>
          <View id="left_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button} onPress={() => format_note('left',' ')}/>
            <Button title="1" style={styles.button} onPress={() => format_note('left','1')}/>
            <Button title="2" style={styles.button} onPress={() => format_note('left','2')}/>
            <Button title="3" style={styles.button} onPress={() => format_note('left','3')}/>
            <Button title="4" style={styles.button} onPress={() => format_note('left','4')}/>
            <Button title="5" style={styles.button} onPress={() => format_note('left','5')}/>
            <Button title="6" style={styles.button} onPress={() => format_note('left','6')}/>
            <Button title="7" style={styles.button} onPress={() => format_note('left','7')}/>
            <Button title="·" style={styles.button} onPress={() => format_note('left','·')}/>
          </View>
          <View id="center_display" style={styles.center_display}>
            <View id="note_display" >
              <Text >{content}</Text>
            </View>
            <View id="note_display" >
              <Button title="Done" onPress={props.close} style={styles.button}/>
            </View>
          </View>
          <View id="right_selectors" style={styles.selector}>
            <Button title="␣" style={styles.button} onPress={() => format_note('right',' ')}/>
            <Button title="1" style={styles.button} onPress={() => format_note('right','1')}/>
            <Button title="2" style={styles.button} onPress={() => format_note('right','2')}/>
            <Button title="3" style={styles.button} onPress={() => format_note('right','3')}/>
            <Button title="4" style={styles.button} onPress={() => format_note('right','4')}/>
            <Button title="5" style={styles.button} onPress={() => format_note('right','5')}/>
            <Button title="6" style={styles.button} onPress={() => format_note('right','6')}/>
            <Button title="7" style={styles.button} onPress={() => format_note('right','7')}/>
            <Button title="·" style={styles.button} onPress={() => format_note('right','·')}/>
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
