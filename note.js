import React from 'react';
import onClickOutside from "react-onclickoutside";
import { StyleSheet, Text, View } from 'react-native';

export class Note extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      left_diacritic: '',
      left_note: '',
      right_note: '',
      right_diacritic: '',
      notes: '·',
      menuOpen: false
    }
  }
  handleClickOutside(){
    this.setState({
      menuOpen: false
    })
  }
  toggleMenu(){
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }))
  }
  select_note(val){
    this.setState({
      menuOpen: false,
      left_note: val,
      notes: val
    })
  }
  render(){
  return (
    <span className="dd-wrapper">
      <span className="note-header" onClick={() => this.toggleMenu()}>
        <span className="dd-header-title"> {this.state.notes} </span>
      </span>
      {this.state.menuOpen && <ul className="dd-list">
        <li className="dd-list-item" onClick={() => this.select_note(' ')}> </li>
        <li className="dd-list-item" onClick={() => this.select_note('·')}>·</li>
        <li className="dd-list-item" onClick={() => this.select_note('1')}>1</li>
        <li className="dd-list-item" onClick={() => this.select_note('2')}>2</li>
        <li className="dd-list-item" onClick={() => this.select_note('3')}>3</li>
        <li className="dd-list-item" onClick={() => this.select_note('4')}>4</li>
        <li className="dd-list-item" onClick={() => this.select_note('5')}>5</li>
        <li className="dd-list-item" onClick={() => this.select_note('6')}>6</li>
        <li className="dd-list-item" onClick={() => this.select_note('7')}>7</li>
      </ul>}
    </span>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
