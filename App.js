import * as React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {SongScreen} from 'screens/song.js';

function Document(props){
  return (
    <TouchableOpacity style={styles.document} key={props.name}
      onPress={() => props.navigation.navigate('Song',{name:props.name, path:props.path})}>
      <Text>{props.name}</Text>
    </TouchableOpacity>
    )
}

function HomeScreen({ navigation }) {
  let docs = [];
  //<Icon name="plus-circle-outline"/>
  let plus_icon = <Icon name="plus-circle-outline"/>;
  docs.push(Document({name:plus_icon,navigation:navigation,path:false}));

  for(let i = 0; i < 10; i++)
    docs.push(Document({name:i,navigation:navigation,path:i}))

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

function SongScreen({route, navigation}) {
  const { path } = route.params;
  console.log(route.params);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Song Screen: { path }</Text>
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
