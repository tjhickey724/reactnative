/*
  still need to 
  check for end of game, i.e. correct answer or 6 incorrect guesses
  and improve the style a bit ... 
*/

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import words5 from '../assets/words5a';
import {pick_random_word,analyze_guess,word2list} from '../lib/words';
import ButtonWide from '../components/ButtonWide';

const App = () => {
  const [word, setWord] = useState(words5[1000]);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [debugging, setDebugging] = useState(false);
  const [gameover,setGameover] = useState(false);

  console.log('words5 has length',words5.length);

  const Guess = ({guess}) => {
      const clue = analyze_guess(word,guess);
      console.log('clue is',clue);
      console.log(JSON.stringify(word2list(guess)));
      console.log('guesses is',JSON.stringify(guesses));
      const color = {'+':'lightgreen','-':'yellow','.':'white'};
    return (
    <View style={{flex:1,flexDirection:'row',justifyContent:'center',
                  backgroundColor:'lightblue',margin:0,padding:2,}}>
        {word2list(guess).map((letter,index) => (
            <Text key={index} 
                    style={{backgroundColor:color[clue[index]],
                            fontSize:30,
                            fontFamily:'Courier New',
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
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Random Word App</Text>
        
        {(guesses.length<6 && !gameover)?
           <>
            <TextInput  
                style={{width:250, fontSize:30,
                        margin:20,
                        textAlign:'center', 
                        borderColor: 'gray', borderWidth: 1}}
                autoCapitalize='none'
                placeholder="Enter a guess"
                onChangeText={text => setGuess(text)}
                onSubmitEditting={() => setGuesses(guesses.concat(guess))}
                value={guess}
            />
            <ButtonWide
                label="Check Guess" 
                theme="primary"
                onPress = {() => {
                    setGuesses(guesses.concat(guess));
                    if (!words5.includes(guess)){
                        setGuess("")
                    } else if (guess==word) {
                        setGameover(true);
                    } else {
                        setGuess("");
                    }
                   
                    }}/>
          </>
          :
          <Text style={{fontSize:30,textAlign:'center'}}>
            {guess==word?"You Win!":"You Lose!"}
            </Text>
          }
       
        <FlatList
                    data={guesses}
                    keyExtractor={({ id },index) => index}
                    renderItem={({item}) => (
                        <Guess guess={item} />                          
                    )}
        />
        {debugging && <Text>word is {word}</Text>}
        <ButtonWide label="Reset" theme='primary' onPress = {() => {
            setGuesses([]);
            setGuess("");
            setDebugging(false);
            setGameover(false);
            setWord(pick_random_word(words5))}}/>
        <Button 
            title={debugging?"hide answer":"Show Answer" }
            onPress={() => setDebugging(!debugging)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop:50,
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