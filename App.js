import React from 'react';
import * as RNFS from 'react-native-fs';
import { StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import { Editor } from './editor.js';

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
    let content = '1 1 1 1\t3 2 7 6\t2 3 2 76\t72 35 65 3\n6 7 3 2\t6 3 2 7\t3 5 3 2\t5 3 2 7\n6 7 3 2\t6 3 2 7\t3 5 3 2\t· 7 5 6\n5 3 5 3\t7 6 2 7\t3 5 3 2\t· 7 5 6';
    //let content = '0a 1a 2a 3a\t0b 1b 2b 3b\t0c 1c 2c 3c\t0d 1d 2d 3d\n0e 1e 2e 3e\t0f 1f 2f 3f\t0g 1g 2g 3g\t0h 1h 2h 3h\n0i 1i 2i 3i\t0j 1j 2j 3j\t0k 1k 2k 3k\t0l 1l 2l 3l\n0m 1m 2m 3m\t0n 1n 2n 3n\t0o 1o 2o 3o\t0p 1p 2p 3p'
    let lines = content.split('\n')
    this.state = {
      results:'results',
      lines:lines
    }
    let RNFS = require('react-native-fs');
    let path = RNFS.DocumentDirectoryPath + '/irama_ciblon.pan';
    //let content = '2 3 2 7\t3 2 7 6\t2 3 2 76\t72 35 65 3\n6 7 3 2\t6 3 2 7\t3 5 3 2\t5 3 2 7\n6 7 3 2\t6 3 2 7\t3 5 3 2\t· 7 5 6\n5 3 5 3\t7 6 2 7\t3 5 3 2\t· 7 5 6';
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

  save (){
    console.log('Saving');
    let path = RNFS.DownloadDirectoryPath + '/irama_ciblon.pan';
    let content = '';
    for(let i = 0; i < this.state.lines.length; i++)
      content += this.state.lines[i] + '\n';

    console.log(content);
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
    return (
      <View style={styles.root}>
        <Text>Irama ciblon9</Text>
        <Editor lines={this.state.lines}></Editor>
        <Button onPress={() => this.save()} title="save to file"/>
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
