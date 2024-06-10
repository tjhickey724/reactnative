import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

const Item = ({ item }) => (
    <View style={styles.item}>
        <Text>{item}</Text>
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
                    setTodos([...todos, todo]);
                    setTodo('');
                }} />
            <Text>
                {todos}
            </Text>
            <FlatList
                data={todos}
                renderItem={({item}) =>  <Item item={item}/> }
                keyExtractor={item => item}
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