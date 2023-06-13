import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* 
   this shows how to import javascript functions
   from a module in the lib folder...
*/
import sq,{cube,circle_area,cylinder_volume,power_fns,power_obj} from '../lib/mymath.js';


export default function App() {
  const [square,cuber]=power_fns
  /*
    const square = power_fns[0];
    const cuber = power_fns[1];
  */
  const {sq,fourthpower} = power_obj;
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      <Text> 11111111 squared = {square(11111111)}</Text>
      <Text> 11 cubed = {cuber(11)}</Text>
      <Text> Circle with radius 5280: {circle_area(5280)}</Text>
      <Text> Volume is {cylinder_volume(10,100)}</Text>
      <StatusBar style="auto" />
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
});
