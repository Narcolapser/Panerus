import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

var json_layout = `{
	"title":"Song name",
	"passages":[
		{
			"title":"passage title",
			"instruments":[
				{
					"instrument":"instrument name",
					"lines":[
						["1","2","3","4"],
						["1","2","3","4"],
						["1","2","3","4"],
						["1","2","3","4"]
					]
				}
			]
		}
	]
}`

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
    let passage_title = passage_parts.splice(0,1)[0];
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
      {
        lines.push(line_to_lists(passage_parts[j]));
      }
      // No else, if it is not a instrument or a line it's a blank line.
    }
    instruments.push({instrument:instrument,lines:lines});
    passages.push({title: passage_title, instruments:instruments});
  }
  return {passages:passages,title:title};
}

function line_to_lists(line)
{
  let ret = [];
  let gatra = line.split('\t');
  for(let i = 0; i < gatra.length; i++)
    ret.push(gatra[i].split(' '))
  return ret;
}


export function SongScreen({route, navigation}) {
  const { path } = route.params;
  let [content, setContent] = React.useState(parse_song(example));
  let [show_modal, set_show_modal] = React.useState(false);
  let [note_locator, set_note_locator] = React.useState({passage:0,line:0,gatra:0,note:0});
  let edit_song = (passage, obj) => {
    obj.passage = passage;
    console.log("Updating song: " + JSON.stringify(obj));
    let line = obj['line'];
    let gatra = obj['gatra'];
    let note = obj['note'];
    set_note_locator(obj);
    console.log(content['passages'][passage]['instruments'][0]['lines']);
    console.log(content['passages'][passage]['instruments'][0]['lines'][line][gatra][note]);
    console.log(obj);
    set_show_modal(true);
  }

  let addPassage = () => {
    let new_content = JSON.parse(JSON.stringify(content));
    console.log(new_content);
    new_content['passages'].push({title:'new passage',instruments:[{instrument:'',lines:[defaultLine]}]});
    console.log(new_content);
    console.log("Saving now");
    setContent(new_content);
    console.log("Done");
  }

  let change_note = (note) =>
  {
    console.log("changing " + JSON.stringify(note_locator) + " to " + note);
    console.log(note);
    content['passages'][note_locator.passage]['instruments'][0]['lines'][note_locator.line][note_locator.gatra][note_locator.note] = note;
    setContent(content);
  }

  let close_modal = () =>
  {
    set_show_modal(false);
  }
  let passages = []
  for(let i = 0; i < content['passages'].length; i++)
    passages.push(
      Passage({content: content['passages'][i]['instruments'][0],
               title: content['passages'][i]['title'],
               key: i,
               edit: (obj) => {edit_song(i,obj)}}));

  return (
    <View>
      <Note_Selector change_note={change_note} visible={show_modal} close={close_modal}
        content={content['passages'][note_locator.passage]['instruments'][0]['lines'][note_locator.line][note_locator.gatra][note_locator.note]}
      ></Note_Selector>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text>Title: { content['title'] }</Text>
          </View>
          {passages}
        </View>
        <Button title="Add passage" onPress={addPassage}><Icon name="plus-circle-outline"/></Button>
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
    let lines = props.content.lines;
    lines.push(defaultLine);
    console.log("adding line:");
    console.log(lines);
    props.onChange(lines.join('\n'));
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
    if (side == 'left')
      if (props.content.length == 1)
        props.change_note(value);
      else
        props.change_note(value + props.content[1])
    else
      props.change_note(props.content[0] + value);
  }
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
              <Text >{props.content}</Text>
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
