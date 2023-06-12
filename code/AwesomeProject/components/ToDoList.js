import React,{useState} from 'react';
import {View, Text} from 'react-native';

const App = () => {
    const [todos,setTodos] = useState([]);
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

      </View>
    )
  }



export default App;
