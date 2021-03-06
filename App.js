import React, {useState, useEffect} from 'react';
import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View, Button, PermissionsAndroid, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SongScreen } from './song.js';
import { new_song } from './pan_file.js';

function Document(props){
  let load = () => {
    console.log("Loading " + props.name);
    if (!props.path)
    {
      let content = JSON.parse(new_song);
      console.log("contents json string: " );
      console.log(JSON.stringify(content));
      props.navigation.navigate('Song',{name:props.name, path:props.path, content:content});
    }
    else
    {
      RNFS.readFile(props.path,'utf8')
        .then((contents) => {
          console.log(props.path);
          let content = JSON.parse(contents);
          console.log(content);
          props.navigation.navigate('Song',{name:props.name, path:props.path, content:content});
        })
        .catch((err) => {
          console.log(err.message, err.code);
        })
    }
  }
  return (
    <TouchableOpacity style={styles.document} key={props.name}
      onPress={load}>
      <Text>{props.name}</Text>
    </TouchableOpacity>
    )
}

function HomeScreen({ navigation }) {
  const [doc_list, set_doc_list] = useState([]);

  let file = (new_file) => {
    let copy = JSON.parse(JSON.stringify(doc_list));
    copy.push(new_file)
    set_doc_list(copy);
  }
  useEffect( () => {
    let RNFS = require('react-native-fs');
    results = RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      let files = []
      for(let i = 0; i < result.length; i++)
      {
        if ((result[i]['path'].slice(-3) == 'pan'))
        {
          RNFS.readFile(result[i]['path'],'utf8')
            .then((contents) => {
              console.log(result[i]['path']);
              let content = JSON.parse(contents);
              console.log(content);
              let copy = JSON.parse(JSON.stringify(doc_list));
              copy.push({'path':result[i]['path'],'content':content})
              set_doc_list(copy);
              console.log('Added ' + result[i]['path'] + ' to list of files.');
            })
            .catch((err) => {
              console.log(err.message, err.code);
            })

        }

      }
      console.log(JSON.stringify(files));

    });

    }, [])

  let docs = [];
  //<Icon name="plus-circle-outline"/>
  let plus_icon = <Icon name="plus-circle-outline"/>;
  docs.push(Document({name:plus_icon,navigation:navigation,path:false}));

  console.log('There are ' + doc_list.length + ' documents');
  for(let i = 0; i < doc_list.length; i++)
  {
    console.log(doc_list[i]);
    docs.push(Document({name:doc_list[i]['content']['title'],navigation:navigation,path:doc_list[i]['path']}))
  }

  return (
    <View style={styles.root}>
      <View style={styles.side_bar}></View>
      <View style={styles.middle}>
        <ScrollView style={styles.document_scroll}>
          { docs }
        </ScrollView>
      </View>
      <View style={styles.side_bar}></View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Song" component={SongScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  side_bar:{
    flex: 1,
    backgroundColor: 'grey',
    height: '100%'
  },
  middle:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  document:{
    width: "100%",
    height: 200,
    borderWidth: 4,
    borderColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
  },
  document_scroll: {
    width: "100%",
  }
});
