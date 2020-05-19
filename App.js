import * as React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {SongScreen} from 'screens/song.js';

function Document(props){
  return (
    <View style={styles.document} key={props.name}>
      <Text>{props.name}</Text>
    </View>
    )
}

function HomeScreen({ navigation }) {
  let docs = [];
  //<Icon name="plus-circle-outline"/>
  let plus_icon = <Icon name="plus-circle-outline"/>;
  docs.push(Document({"name":plus_icon}));

  for(let i = 0; i < 10; i++)
    docs.push(Document({"name":i}))

  return (
    <View style={styles.root}>
      <View style={styles.side_bar}><Text>Left</Text></View>
      <View style={styles.middle}>
        <ScrollView style={styles.document_scroll}>
          <Text>Top2</Text>
          { docs }
          <Text>Bottom</Text>
        </ScrollView>
      </View>
      <View style={styles.side_bar}><Text>Right</Text></View>
    </View>
  );
}

function SongScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Song Screen</Text>
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
    backgroundColor: 'pink',
    width: "100%",
  }
});
