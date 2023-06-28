import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

const guesses = ['hello','world','goodbye','cruel','world'];

const App = () => {
    return (
      <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <FlatList
            data={guesses}
            keyExtractor={({ id },index) => index}
            renderItem={({item}) => (
                 <View style={{borderWidth:5,borderColor:'blue'}}>
                    <Text style={{fontSize:60,textAlign:'center',margin:10,padding:20}}>{item}</Text>
                    <Image 
                         style={{width:100,height:100}} 
                         source={{uri:item['strMealThumb'}}
                    />
                 </View>                         
            )}
         />
      </SafeAreaView>
    )
            }

export default App;



