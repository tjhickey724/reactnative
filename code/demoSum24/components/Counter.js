
import React,{useState} from 'react';
import { SafeAreaView,StyleSheet, Text, Button, View } from 'react-native';

const Counter = ({children}) => {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Tim Hickey's Newer App</Text>
      <Text>Count: {count}</Text>
      <Button title="add 1" 
           onPress={() => setCount(count + 1)}/>
      <Button title="sub 1" 
           onPress={() => setCount(count - 1)}/>
      {children}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//export {Counter};
export default Counter
