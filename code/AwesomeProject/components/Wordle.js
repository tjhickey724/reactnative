/*
  still need to 
  check for end of game, i.e. correct answer or 6 incorrect guesses
  and improve the style a bit ... 
*/

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word,analyze_guess,word2list} from '../lib/words';

const App = () => {
  const [word, setWord] = useState(words5[1000]);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  console.log('words5 has length',words5.length);

  const Guess = ({guess}) => {
      const clue = analyze_guess(word,guess);
      console.log('clue is',clue);
      console.log(JSON.stringify(word2list(guess)));
      console.log('guesses is',JSON.stringify(guesses));
      const color = {'+':'lightgreen','-':'yellow','.':'white'};
    return (
    <View style={{flex:1,flexDirection:'row',
                  backgroundColor:'lightblue',margin:0,padding:2,}}>
        {word2list(guess).map((letter,index) => (
            <Text key={index} 
                    style={{backgroundColor:color[clue[index]],
                            fontSize:30,
                            fontFamily:'monospace',
                            borderWidth:1,
                            borderColor:'black',
                            padding:5,
                            margin:0,}}>
                            {letter}
            </Text>
        ))}
    </View>
  )};

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Random Word App</Text>
        <Text style={styles.word}>{word}</Text>
        <Button title="Reset" onPress = {() => setWord(pick_random_word(words5))}/>
        <Text> Make a guess </Text>
        <View>
            <TextInput  
                style={{width:150, fontSize:30,
                        textAlign:'center', 
                        borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setGuess(text)}
                value={guess}
            />
        </View>
        <Button 
            title="Check Guess" 
            onPress = {() => setGuesses(guesses.concat(guess))}/>

        <Text> {guess} clue ='{analyze_guess(word,guess)}' </Text>
        <FlatList
                data={guesses}
                keyExtractor={({ id },index) => index}
                renderItem={({item}) => (
                    <Guess guess={item} />                          
                )}
            />
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