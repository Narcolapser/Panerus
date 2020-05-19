import * as React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import {SongScreen} from 'screens/song.js';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.sideBar}><Text>Left</Text></View>
      <View style={styles.middle}>
        <Text>Home Screen1</Text>
        <Button
          title="Go to Song"
          onPress={() => navigation.navigate('Song')}
        />
      </View>
      <View style={styles.sideBar}><Text>Right</Text></View>
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
  container: {
    flex: 1,
    //marginTop: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    width: '50%'
  },
  text: {
    fontSize: 42,
  },
  navBar: {
    flex: 1,
    width: '100%',
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  sideBar:{
    flex: 1,
    backgroundColor: 'grey',
    height: '100%'
  },
  middle:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
