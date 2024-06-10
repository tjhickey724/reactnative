import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

const Item = ({ item, incrChanges }) => (
    <View style={styles.item}>
        <Text>{item['title']}</Text>
        <Button title="Done" onPress={() => {
              item['completed']=true;
              incrChanges()}} />
        <Text>{item['completed']?'done':'---'}</Text>
        <Text>{JSON.stringify(item)}</Text>
    </View>
);

/*
  add a counter state to the todolist 
  and instead of pushing just the todo item,
  push an object with the todo item and the counter value
  and the Date and Time the todo was added.
  {count:7, todo:'Buy Milk', date: '2021-10-05 12:30:00'}
  use the count as the key and display the date and count
  in the <Item> component instead of just the todo item.
*/

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [count, setCount] = useState(0);
    const [changes, setChanges] = useState(0);

    const incrChanges = () => {
        setChanges(changes+1);
    }

    return (
        <View style={styles.container}>
            <Text>ToDo List</Text>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setTodo(text)}
                value={todo} />
            <Button
                title="Add ToDo"
                onPress={() => {
                    let todo_item = {title:todo, completed:false};
                    //setTodos([...todos, todo_item]);
                    setTodos(todos.concat(todo_item))
                    setTodo('');
                }} />
            <Text>
                {JSON.stringify(todos)}
            </Text>
            <FlatList
                data={todos.filter(item => !item['completed'])}
                extraData={changes}
                renderItem={({item}) =>  <Item item={item} incrChanges={incrChanges}/> }
                keyExtractor={item => item['title']}
             />

        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor:'blue',
        borderWidth: 1,
    },
});

export default ToDoList;