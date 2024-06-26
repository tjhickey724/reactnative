/*
  still need to 
  check for end of game, i.e. correct answer or 6 incorrect guesses
  and improve the style a bit ... 
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TextInput, StyleSheet, Button } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word,analyze_guess} from '../lib/words';
import GuessList from '../components/GuessList';
import WordleButton from '../components/WordleButton';
import axios from 'axios';



const App = () => {
    const [word, setWord] = useState(pick_random_word(words5));
    const [guessNum, setGuessNum] = useState(0)
    const [guess, setGuess] = useState("");
    const [guessText, setGuessText] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [guesses, setGuesses] = useState([]);
    const [debugging,setDebugging] = useState(false);  /* debugging mode */
    const [group,setGroup] = useState('cs153aSum24'); 
    const [scores,setScores] = useState([]);
    const [usernameText,setUsernameText] = useState("")
    const [username,setUsername] = useState(''); /* username for high score */
    const [gamesPlayed,setGamesPlayed] = useState(0); /* number of games played */
    // [word,guessNum,guess,gameOver,guesss,debugging,group,scores,username,gamesPlayed]
    const validateGuess = (guess) =>{
        return guess.length ==5;
    };

    const server1 = 'http://gracehopper.cs-i.brandeis.edu:3000';
    const server2 = 'http://localhost:3000';
    const server3 = 'https://2cb3-209-6-142-225.ngrok-free.app';
    const server = server3;

    const getScores = async () => {
        try {
            console.log("preparing to get scores")
            let url = server+'/room?id='+group;
            console.log(`url=|${url}|`)
            let scores = await axios(server+'/room?id='+group)
            console.log(`just read scores from server`)
            console.log(JSON.stringify(scores.data))
            console.dir(scores.data)
            setScores(scores.data); 
        }
        catch(error){
          console.log("found error in getScores")
          console.dir(error)
          alert(error);
        }
    }

    const saveScore = async (word) => {
        try {
            setGamesPlayed(gamesPlayed+1);
            console.log('saving scores')
            let score = 
                await axios(
                    {method: 'post',
                    url: server+'/room',
                    data: {id:group, uid:username, data:gamesPlayed+1},
                    }); 
            console.dir(score);
        }
        catch(error){d
          console.log("error in saveScore")
          console.dir(error)
            alert(error);
        }
        

    };

    const updateGuess = () => {
      setGuess(guessText);
    }

    const updateUsername = async () => {
      console.log(`updating username to ${usernameText}`)
      await getScores();
      await setUsername(usernameText); 
    }

    const updateGroup = async (group) => {
      console.log(`updating group`)
      await getScores();
      await setGroup(group); 
    }

    const updateGamesPlayed = () => {
      console.log("in updateGamesPlayed")
      console.dir([username,scores,gamesPlayed])
      if (username in scores) {
        setGamesPlayed(scores[username])
      }
    }

    const checkGuess = () => {
      console.log('in checkGuess')
      console.dir([guess,word,guesses,guessNum])
        if (guess.toLowerCase() == word) {
            setGuesses(guesses.concat(guess));
            
            alert('You guessed the word ' + word + ' in ' + (guessNum+1)+ ((guessNum==0)?' guess':' guesses'));
            setGuessNum(guessNum+1);
            setGameOver(true);
            saveScore(word);
        
        } else if (!words5.includes(guess.toLowerCase()) ){ /* check that the guess is in the array wards5*/
            guess=="" || alert('Your guess is not a valid word. Please try again.');
        }else if (guessNum == 5 && guess != word) {
          alert('You have already submitted the maximum number of guesses. The word was '+word);
          setGameOver(true);
          setGuesses(guesses.concat(guess));
          
        } else {
          setGuesses(guesses.concat(guess));
          setGuessNum(guessNum+1);
        }
        setGuess(''); 
        updateGamesPlayed()
    }
    
    useEffect(() => getScores,[]);
    useEffect(() => getScores,[gamesPlayed,group]);
    useEffect(() => updateGamesPlayed,[guess,group])
    useEffect(() =>checkGuess,[guess])

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Random Word App</Text>
        <View style={{flex:1,flexDirection:'row'}}>
            <TextInput 
                style={{width:150, fontSize:10,
                        textAlign:'center',
                        fontFamily:'Courier New',
                        borderColor: 'gray', borderWidth: 1}}
                autoCapitalize='none'
                onChangeText={text => setUsernameText(text)}
                onSubmitEditing={updateUsername}
                value={usernameText}
            />
              <TextInput  
                    style={{width:150, fontSize:10,
                            textAlign:'center', 
                            fontFamily:'Courier New',
                            borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={updateGroup}
                    value={group}
                />
            </View>


      {gameOver?
        <>
              <WordleButton title="Reset" 
                  onPress = {() => {
                        setWord(pick_random_word(words5));
                        setGuesses([]);
                        setGuessNum(0);
                        {/* JF - clear guess box */}
                        setGuess('');
                        setGameOver(false);
                      }}/>
              <FlatList
                      data={
                        Object.keys(scores).map(
                          (t) => ({id:t,val:scores[t]})
                        )
                      }
                      keyExtractor={({ id },index) => index}
                      renderItem={ ({item}) => {
                        let id = item.id
                        let val = item.val
                     
                        console.log(`id=${id} val=${val}`)
                        return (
                          <View style={{flex:1,flexDirection:'row'}}> 
                              <Text>{id}: </Text>
                              <Text>{val}</Text> 
                          </View>
                      )}
                    }
                  />
          </>
         : 
      <>
        <Text> Make a guess </Text>
        <View style={{flex:1,flexDirection:'row'}}>
            <TextInput  
                style={{width:150, fontSize:10,
                        textAlign:'center', 
                        fontFamily:'Courier New',
                        borderColor: 'gray', borderWidth: 1}}
                autoCapitalize='none'
                onChangeText={text => setGuessText(text)}
                onSubmitEditing={() => setGuess(guessText)}
                value={guessText}
            />
            
        </View>

        <Text> {gamesPlayed} games played</Text>
        
    </>
   
    }

        
        <GuessList word={word} guesses={guesses} />
        <Text>Guesses remaining: {6-guessNum}</Text>
       
        {/*<Text> scores = {JSON.stringify(scores['data'],null,5)}</Text> */}
        <View style={{flex:20}}>
            <Text>  </Text> 
        </View>

       {/*  TH - adding code to only show clue when debugging ...   */}
       {debugging? 
        <View>
         <Text style={styles.word}>word is {word}</Text>
         <Text>
          {
             JSON.stringify(
              [word,guessNum,guess,gameOver,guess,
               debugging,group,scores,scores[username],usernameText,username,gamesPlayed]
              )
          }
         </Text>
         </View>
         :
         <Text>debugging is off</Text>
       }
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

