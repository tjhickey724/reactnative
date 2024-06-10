import React,{useState,useReducer} from 'react';
import {View, Text} from 'react-native';
import { Button, FlatList, TextInput } from 'react-native-web';


const App = () => {
    const [todos,setTodos] = useState([]);
    const [text,setText] = useState('');  // this is the text in the TextInput
    const [tasks,dispatch] = useReducer(tasksReducer,initialTasks);
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
                data={tasks}
                keyExtractor={({ id }, index) => id}  // this is a function that returns a unique key for each item in the list
                renderItem={({ item }) => (
                    <Text>{item.title} {item.priority} {item.in_progress}</Text>
                )}  // this is a function that returns the JSX for each item in the list
            />
            <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={text => setText(text)}
                        
            />
            <Button title="Add Todo" 
                    onPress={() => 
                        dispatch({
                            type: 'added',
                            id: nextId++,
                            text: text,
                          }); 
                       //setTodos([...todos, {id: todos.length, title: text}])
                    } />  

      </View>
    )
  }

  function addTask()

  function tasksReducer(tasks, action) {
    alert('action='+action.type)
    switch (action.type) {
      case 'added': {
        let id = tasks.length;
        return [...tasks, {
          id: id,
          text: action.text,
          done: false,
          priority:action.priority,
          in_progress: false,
        }];
      }
      case 'changed': {
        return tasks.map(t => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
      }
      case 'toggle_progress': {
        return tasks.map(t => {
          if (t.id === action.task_id) {
            return {...t, in_progress:!(t.in_progress)};// copy of t with in_progress flipped
          } else {
            return t;
          }
        });
      }
      case 'update_priority': {
        return tasks.map(t => {
          if (t.id === action.task_id) {
            return {...t, priority:action.task_priority};// copy of t with in_progress flipped
          } else {
            return t;
          }
        });
      }
      case 'deleted': {
        return tasks.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  let nextId=3;

  const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', in_progress:false, priority:0, done: true },
    { id: 1, text: 'Visit the temple',   in_progress:false, priority:0, done: false },
    { id: 2, text: 'Drink matcha',       in_progress:true,  priority:0, done: false },
  ];
  
export default App;
