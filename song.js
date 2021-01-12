import * as React from 'react';
import { Button, View, Text, Modal, TouchableNativeFeedback, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parse_song, save_song, requestExternalWrite, export_song} from './pan_file.js';
import {Note_Selector} from './note_selector.js'
import {Passage} from './passage.js'
import {Line} from './line.js'
import {Note} from './note.js'
import {EditableLabel, Label_Editor} from './editablelabel.js'

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
  let [show_label_modal, set_label_modal] = React.useState(false);
  let [label_selector, set_label_selector] = React.useState(null);
  let [label_value, set_label_value] = React.useState('');


  let [focus, set_focus] = React.useState({passage:0,line:0,note:0});
  let [show_note_selector, set_show_note_selector] = React.useState(false);
  let [focus_note, set_focus_note] = React.useState('ab');

  let [show_modal, set_show_modal] = React.useState(false);
  let [note_locator, set_note_locator] = React.useState({passage:0,line:0,note:0});

  let [content, _setContent] = React.useState(route.params.content);

  let setContent = (new_content) =>
  {
    set_focus_note(content['passages'][focus.passage]['instruments'][0]['lines'][focus.line][focus.note]);
    _setContent(new_content);
  }

  let edit_note = (passage, line, note) => {
    console.log('editing note!');
    console.log(passage, line, note);
    set_focus({passage:passage,line:line,note:note});
    set_focus_note(content['passages'][focus.passage]['instruments'][0]['lines'][focus.line][focus.note]);
    set_show_note_selector(true);
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
    //content['passages'][note_locator.passage]['instruments'][0]['lines'][note_locator.line][note_locator.note] = note;
    content['passages'][focus.passage]['instruments'][0]['lines'][focus.line][focus.note] = note
    setContent(content);
  }

  let close_modal = () =>
  {
    set_show_note_selector(false);
  }

  let delete_file = () =>
  {
    let path = RNFS.DocumentDirectoryPath + '/' + content['title'] + '.pan';
    console.log('Deleting file: ' + path);
    RNFS.unlink(path)
    .then(() => {
      console.log('File deleted');
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  let edit_label = (id) =>
  {
    console.log('Editing: ' + id);
    if (id == 'title')
    {
      set_label_value(content['title']);
      set_label_selector(id);
    }
    else {
      set_label_value(content['passages'][id]['title']);
      set_label_selector(id);
    }

    set_label_modal(true);
    //update, close, visible, content
  }

  let update_label = (text) =>
  {
    if (label_selector == 'title')
      content['title'] = text;
    else {
      content['passages'][label_selector]['title'] = text;
    }
    console.log(id);
    console.log(text);
  }

  let close_label = () =>
  {
    set_label_modal(false);
  }

  let passages = []
  for(let i = 0; i < content['passages'].length; i++)
    passages.push(
      Passage({content: content['passages'][i]['instruments'][0],
               title: content['passages'][i]['title'],
               key: i,
							 add_line: add_line,
               edit_title: (id) => {edit_label(id)},
               edit: edit_note}));
               //edit: (obj) => {edit_song(i,obj)}}));


               //content={content['passages'][focus.passage]['instruments'][0]['lines'][focus.line][focus.note]}

               //content={content['passages'][focus.passage]['instruments'][0]['lines'][focus.line][focus.note]}
  return (
    <View>
      <Note_Selector change_note={change_note} visible={show_note_selector} close={close_modal} content={focus_note}
      ></Note_Selector>
      <Label_Editor update={update_label} close={close_label} visible={show_label_modal} content={label_value} id='Title'></Label_Editor>
			<View style={{flexDirection: 'row'}}>
				<Button title="Save" onPress={() => {save_song(content)}}></Button>
				<Button title="Preview"></Button>
				<Button title="Export" onPress={() => {export_song(content)}}></Button>
				<Button title="Delete" onPress={delete_file}></Button>
			</View>
      <View style={{width:"100%"}}>
        <ScrollView style={{width:"100%"}}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <EditableLabel content={content['title']} edit={edit_label} id='title'></EditableLabel>
            </View>
            {passages}
          </View>
          <Button title="Add passage" onPress={add_passage}><Icon name="plus-circle-outline"/></Button>
        </ScrollView>
      </View>
    </View>
  );
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
