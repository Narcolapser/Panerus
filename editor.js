import React from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import { Line } from './line.js';


export class Editor extends React.Component {
  constructor(props) {
    super(props)
  }
  update_line(line, value)
  {
    console.log('App level: Updating line ' + line + ' to ' + value);
    let lines = this.props.lines;
    console.log(lines);
    lines[line] = value;
    console.log('Lines are now:');
    console.log(lines);
    this.setState({lines:lines});
  }
  render()
  {
    let lines = [];
    for(let i = 0; i < this.props.lines.length; i++)
    {
      lines.push
      (
        <View style={styles.gatra} key={i}>
          <Line gatras={this.props.lines[i]} onChange={(value) => this.update_line(i,value)}></Line>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        { lines }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    flexWrap:'wrap'
  }
});
