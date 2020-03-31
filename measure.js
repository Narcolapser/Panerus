import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Note } from './note.js';

export function Measure() {
  return (
    <div>
      <Note></Note>
      <Note></Note>
      <Note></Note>
      <Note></Note>
    </div>
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
