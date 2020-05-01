import React from 'react';
import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import { Gatra } from './gatra.js';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

const requestExternalWrite = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Access to your files is needed to save the PDF",
        message:
          "In order to save the pdf write access to your files and documents is needed.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can write externally");
    } else {
      console.log("write permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let content = '1 1 1 1	3 2 7 6	2 3 2 76	72 35 65 3\n6 7 3 2	6 3 2 7	3 5 3 2	5 3 2 7\n6 7 3 2	6 3 2 7	3 5 3 2	· 7 5 6\n5 3 5 3	7 6 2 7	3 5 3 2	· 7 5 6';
    let lines = content.split('\n')
    this.state = {
      results:'results',
      lines:lines
    }
    let RNFS = require('react-native-fs');
    let path = RNFS.DocumentDirectoryPath + '/irama_ciblon.pan';
    //let content = '2 3 2 7	3 2 7 6	2 3 2 76	72 35 65 3\n6 7 3 2	6 3 2 7	3 5 3 2	5 3 2 7\n6 7 3 2	6 3 2 7	3 5 3 2	· 7 5 6\n5 3 5 3	7 6 2 7	3 5 3 2	· 7 5 6';
    RNFS.readFile(path, 'utf8')
      .then((contents) => {
        let lines = content.split('\n')
        this.setState({lines:lines});
        })
      .catch((err) => {
        console.log(err.message, err.code);
        })

    let results = RNFS.DocumentDirectoryPath;
    results = RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        let files = []
        for(let i = 0; i < result.length; i++)
          files.push(result[i]['path']);
        this.setState({results:JSON.stringify(files)})
      });

  }

  save (self){
    console.log('Saving');
    let path = RNFS.DocumentDirectoryPath + '/irama_ciblon.pan';
    let content = "";
    for(let i = 0; i < this.state.lines; i++)
      content += this.state.lines[i] + '\n';
    RNFS.writeFile(path, content)
      .then((success) => {
        console.log('Succesfully wrote irama!');
      })
      .catch((err) =>{
        console.log('err.message');
      });
  }

  async create_pdf(){
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents'
    };
    console.log('creating pdf');
    let file = await RNHTMLtoPDF.convert(options).
    catch(err => {
      console.error(err);
      return `Error: ${err}`;
    });
    // console.log(file);
    //let path = RNFS.DocumentDirectoryPath + '/irama_ciblon.pdf';




//    let path = '/storage/emulated/0/Download/irama_ciblon.pdf';
//    RNFS.writeFile(path, file['base64'], 'base64')
//      .then((success) => {
//        console.log('Succesfully wrote irama!');
//      })
//      .catch((err) =>{
//        console.log(err.message);
//      });
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
        <Text>Irama ciblon6</Text>
        <View style={styles.container}>
          { lines }
        </View>
        <Button onPress={this.save(this)} title="save to file"/>
        <Button onPress={this.create_pdf} title="save to pdf"/>
        <Button onPress={requestExternalWrite} title="request permissions" />
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
