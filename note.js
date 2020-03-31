import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Note() {
  function changeNote(e) {
    e.preventDefault();
    console.log('Note was clicked')
  }
  return (
    <span>
      <select onClick={changeNote} style="">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
      </select>
    </span>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
