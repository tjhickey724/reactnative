import React,{useState} from 'react';
import {View, Text} from 'react-native';
import { Button, FlatList, TextInput } from 'react-native-web';

const App = () => {
    const [todos,setTodos] = useState([]);
    const [text,setText] = useState('');  // this is the text in the TextInput

    return (
      <View style={{flex: 1, 
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin:20,
                    padding:20,
                  }} >
            <Text style = {{fontSize: 40}}>
                To To List Demo
            </Text>
            <FlatList
                data={todos}
                keyExtractor={({ id }, index) => id}  // this is a function that returns a unique key for each item in the list
                renderItem={({ item }) => (
                    <Text>{item.title}</Text>
                )}  // this is a function that returns the JSX for each item in the list
            />
            <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => setText(text)}
                        
            />
            <Button title="Add Todo" 
                    onPress={() => 
                       setTodos([...todos, {id: todos.length, title: text}])} />  

      </View>
    )
  }



export default App;
