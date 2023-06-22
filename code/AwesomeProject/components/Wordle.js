/*
  still need to get user's guesses
  store them in a list
  display them in a flatlist with pretty colors showing correct/incorrect letters
  check for end of game, i.e. correct answer or 6 incorrect guesses
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word} from '../lib/words';

const App = () => {
  const [word, setWord] = useState(words5[1000]);
  console.log('words5 has length',words5.length);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Random Word App</Text>
      <Text style={styles.word}>{word}</Text>
      <Button title="Reset" onPress = {() => setWord(pick_random_word(words5))}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  word: {
    fontSize: 18,
  },
});

export default App;