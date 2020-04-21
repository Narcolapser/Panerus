import React from 'react';
import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Gatra } from './gatra.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let content = '2 3 2 7	3 2 7 6	2 3 2 76	72 35 65 3\n6 7 3 2	6 3 2 7	3 5 3 2	5 3 2 7\n6 7 3 2	6 3 2 7	3 5 3 2	· 7 5 6\n5 3 5 3	7 6 2 7	3 5 3 2	· 7 5 6';
    let lines = content.split('\n')
    this.state = {
      results:'results',
      lines:lines
    }
    var RNFS = require('react-native-fs');
    let results = RNFS.DocumentDirectoryPath;
    results = RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        this.setState({results:result[0]['path']})
      });

  }

  save (){
    console.log('Saving')

  }

  render() {
    let lines = [];
    for(let i = 0; i < this.state.lines.length; i++)
    {
      let gatra = this.state.lines[i].split('\t');
      lines.push(<View style={styles.gatra} key={i}>
          <Gatra notes={gatra[0]} key="g0"></Gatra>
          <Gatra notes={gatra[1]} key="g1"></Gatra>
          <Gatra notes={gatra[2]} key="g2"></Gatra>
          <Gatra notes={gatra[3]} key="g3"></Gatra>
      </View>)
    }
    return (
      <View style={styles.root}>
        <Text>{this.state.results}</Text>
        <Text>Irama ciblon6</Text>
        <View style={styles.container}>
          { lines }
        </View>
        <Button onPress={this.save} title="save to file"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  gatra: {
    backgroundColor: '#ccc',
    flexDirection:'row',
    flexWrap:'wrap'
  }
});
