/*
  Simple demo to show we can communicate with a server
  This contains two async methods ..
    getString to get a score from the server
    saveString to save a score from a server
  The idea is to be able to have any user save a string
  and to also pull down a string. I can run this in
  two browsers and see them communicate. Either can store
  and either can read. We need a store button and a read button.
  This is a minimal app but could be the basis of many apps.
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';



const App = () => {
    const [word, setWord] = useState("start");
    const [scores,setScores] = useState([]);
    const username="test";
    const group="153a";



    const server1 = 'http://gracehopper.cs-i.brandeis.edu:3000';
    const server2 = 'http://localhost:3000';
    const server3 = 'https://ff14-209-6-142-225.ngrok-free.app';
    const server = server2;

    const getScores = async () => {
        try {
            let scores = await axios(server+'/room?room_id='+group)
            setScores(scores); 
        }
        catch(error){
            alert(error);
        }
    }

    const saveScore = async (word) => {
        try {
            let score = 
                await axios(
                    {method: 'post',
                    url: server+'/room',
                    data: {room_id:group, user_id:username, data:word},
                    }); 
        }
        catch(error){d
            alert(error);
        }
        

    };

    useEffect(() => getScores,[]);

  

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Server Demo App</Text>
        <View style={{flex:1,flexDirection:'row'}}>
            <TextInput 
                style={{width:150, fontSize:10,
                        textAlign:'center',
                        fontFamily:'Courier New',
                        borderColor: 'gray', borderWidth: 1}}
                autoCapitalize='none'
                onChangeText={text => setUsername(text)}
                value={username}
            />
              <TextInput  
                    style={{width:150, fontSize:10,
                            textAlign:'center', 
                            fontFamily:'Courier New',
                            borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={text => setGroup(text)}
                    value={group}
                />
            </View>


      
        <Text> Make a guess </Text>
        <View style={{flex:1,flexDirection:'row'}}>
            <TextInput  
                style={{width:150, fontSize:10,
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

