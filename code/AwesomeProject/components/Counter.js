import React,{useState,useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [number, setNumber] = useState(0);

  const getCount = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('counter')
        if (jsonValue==null) {
            setNumber(0)
        } else {
            const num = JSON.parse(jsonValue);
            setNumber(num);
        }

    } catch(e) {
        console.log('error')
        console.dir(e)
    }

  }

  const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('counter', jsonValue)
        } catch (e) {
            console.log("error in storeData ")
            console.dir(e)
        }
    }

  useEffect(getCount, 
            [])

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Increment" onPress={() => {
            storeData(number+1);
            setNumber(number + 1)}}/>
      <Button title="Decrement" onPress={() => {
            storeData(number-1);
            setNumber(number - 1)}}/>
      <Text>Current number: {number}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});