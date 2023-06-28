import React from 'react';
import { View, Text, FlatList } from 'react-native';
import {analyze_guess,word2list} from '../lib/words';


const Guess = ({word,guess}) => {
    const clue = analyze_guess(word,guess);
    // console.log('clue is',clue);
    // console.log(JSON.stringify(word2list(guess)));
    // console.log('guesses is',JSON.stringify(guesses));
    const color = {'+':'lightgreen','-':'yellow','.':'white'};
    
  return (
  <View style={{flex:1,flexDirection:'row',
                margin:0,padding:2,}}>
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


const App = ({word, guesses}) => {
    
    return (
        <FlatList
                data={guesses}
                keyExtractor={({ id },index) => index}
                renderItem={({item}) => (
                    <Guess word = {word} guess={item} />                          
                )}
            />
    )
}

export default App;