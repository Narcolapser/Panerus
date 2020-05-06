import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gatra } from './gatra.js';

export class Line extends React.Component {
  constructor(props) {
    super(props)
  }
  update_gatra(gatra, value)
  {
    console.log('Updating the ' + gatra + ' to ' + value);
    let gatras = this.props.gatras.split('\t');
    gatras[gatra] = value;
    console.log('Updating line to: ' + gatras.join('\t'));
    this.props.onChange(gatras.join('\t'));
  }
  render(){
  let gatras = this.props.gatras.split('\t')
  return (
    <View className="dd-wrapper" style={{backgroundColor: '#eee', minWidth: 400, float: 'left', flexDirection: 'row'}}>
      <Gatra style={{flex: 1}} notes={gatras[0]} onChange={(value) => this.update_gatra(0,value)}></Gatra>
      <Gatra style={{flex: 1}} notes={gatras[1]} onChange={(value) => this.update_gatra(1,value)}></Gatra>
      <Gatra style={{flex: 1}} notes={gatras[2]} onChange={(value) => this.update_gatra(2,value)}></Gatra>
      <Gatra style={{flex: 1}} notes={gatras[3]} onChange={(value) => this.update_gatra(3,value)}></Gatra>
    </View>
  )}
}
