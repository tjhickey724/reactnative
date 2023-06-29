/*
  still need to 
  check for end of game, i.e. correct answer or 6 incorrect guesses
  and improve the style a bit ... 
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word,analyze_guess} from '../lib/words';
import GuessList from '../components/GuessList';
import WordleButton from '../components/WordleButton';
import axios from 'axios';



const App = () => {
    const [word, setWord] = useState(pick_random_word(words5));
    const [guessNum, setGuessNum] = useState(0)
    const [guess, setGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [debugging,setDebugging] = useState(false);  /* debugging mode */
    const [group,setGroup] = useState('cs153aSum23'); 
    const [scores,setScores] = useState([]);
    const [username,setUsername] = useState('anon'); /* username for high score */
    const [gamesPlayed,setGamesPlayed] = useState(0); /* number of games played */

    const validateGuess = (guess) =>{
        return guess.length ==5;
    };

    const server1 = 'http://gracehopper.cs-i.brandeis.edu:3000';
    const server2 = 'http://localhost:3000';
    const server = server1;

    const getScores = async () => {
        let scores = await axios(server+'/room?room_id='+group)
        setScores(scores);
    }

    const saveScore = async (word) => {
        setGamesPlayed(gamesPlayed+1);
        let score = 
            await axios(
                {method: 'post',
                 url: server+'/room',
                 data: {room_id:group, user_id:username, data:scores.concat(word)},
                 });
        
        console.log(word);
        console.log(scores);

    };

    useEffect(() => getScores,[gamesPlayed]);

  

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Random Word App</Text>


      {gameOver?
        <WordleButton title="Reset" 
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
                        fontFamily:'Courier New',
                        borderColor: 'gray', borderWidth: 1}}
                autoCapitalize='none'
                onChangeText={text => setGuess(text)}
                value={guess}
            />
        </View>

        <WordleButton 
            title="Check Guess" 
            onPress = {() => {
                  {/* jake - you win alert */}
                  if (guess.toLowerCase() == word) {
                      setGuesses(guesses.concat(guess));
                      
                      alert('You guessed the word ' + word + ' in ' + (guessNum+1)+ ((guessNum==0)?' guess':' guesses'));
                      setGuessNum(guessNum+1);
                      setGameOver(true);
                      saveScore(word);
                  
                  } else if (!words5.includes(guess.toLowerCase()) ){ /* check that the guess is in the array wards5*/
                      alert('Your guess is not a valid word. Please try again.');
                  }else if (guessNum == 5 && guess != word) {
                    alert('You have already submitted the maximum number of guesses. The word was '+word);
                    setGameOver(true);
                    setGuesses(guesses.concat(guess));
                    
                  } else {
                    setGuesses(guesses.concat(guess));
                    setGuessNum(guessNum+1);
                  }
                  setGuess(''); {/* jake - clear the guess box after each guess */}
                  }}/>

        <Text> {guess} clue ='{analyze_guess(word,guess)}' </Text>
        <Text> {gamesPlayed} games played</Text>
    </>
}
        <GuessList word={word} guesses={guesses} />
        <Text>Guesses remaining: {6-guessNum}</Text>
        <Text> scores = {JSON.stringify(scores,null,5)}</Text>
        <TextInput 
            style={{width:150, fontSize:30,
                    textAlign:'center',
                    fontFamily:'Courier New',
                    borderColor: 'gray', borderWidth: 1}}
            autoCapitalize='none'
            onChangeText={text => setUsername(text)}
            value={username}
        />

       {/*  TH - adding code to only show clue when debugging ...   */}
       {debugging? <Text style={styles.word}>word is {word}</Text>:""}
       <Button title={debugging?"hide answer":"show answer"} onPress = {() => setDebugging(!debugging)} />
  
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

