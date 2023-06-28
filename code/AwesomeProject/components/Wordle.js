/*
  still need to 
  check for end of game, i.e. correct answer or 6 incorrect guesses
  and improve the style a bit ... 
*/

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word,analyze_guess} from '../lib/words';
import GuessList from '../components/GuessList';


const App = () => {
  const [word, setWord] = useState(words5[1000]);
  const [guessNum, setGuessNum] = useState(0)
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [debugging,setDebugging] = useState(false);  /* debugging mode */
  console.log('words5 has length',words5.length);

const validateGuess = (guess) =>{
       return guess.length ==5;
};

  

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Random Word App</Text>

       {/*  TH - adding code to only show clue when debugging ...   */}
        {debugging? <Text style={styles.word}>{word}</Text>:""}
       <Button title="debug" onPress = {() => setDebugging(!debugging)} />
      {gameOver?
        <Button title="Reset" 
             onPress = {() => {
                  setWord(pick_random_word(words5));
                  setGuesses([]);
	                setGuessNum(0);
	                {/* JF - clear guess box */}
	                setGuess('');
                  setGameOver(false);
                }}/>
         : 
      <>
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
            onPress = {() => {
                  {/* jake - you win alert */}
                  if (guess == word) {
                      setGuesses(guesses.concat(guess));
                      setGuessNum(guessNum+1);
                      alert('You guessed the word ' + word + ' in ' + guessNum);
                      setGameOver(true);
                  {/*How do we make it so that they can't submit another guess?*/}
                  }else if (guessNum == 6 && guess != word) {
                    alert('You have already submitted the maximum number of guesses.');
                    setGameOver(true);
                  } else {
                    setGuesses(guesses.concat(guess));
                    setGuessNum(guessNum+1);
                  }
                  setGuess(''); {/* jake - clear the guess box after each guess */}
                  }}/>

        <Text> {guess} clue ='{analyze_guess(word,guess)}' </Text>
    </>
}
        <GuessList word={word} guesses={guesses} />
    </SafeAreaView>
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

