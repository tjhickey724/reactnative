import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import DigitView from './DigitView';


const App = () => {
  return (
    <View
      style={[
                styles.container,
               {flexDirection: 'column',backgroundColor:'white',},
             ]}>
      <View style={{flex: 1, flexDirection: 'row'}} >
        <DigitView num = "1" color="red"/>
        <DigitView num = "2" color="green"/>
        <DigitView num = "3" color="blue"/>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}} >
        <DigitView num = "4" color="#fde"/>
        <DigitView num = "5" color="#fca"/>
        <DigitView num = "6" color="#999"/>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}} >
        <DigitView num = "7" color="#ff0000"/>
        <DigitView num = "8" color="#00af00"/>
        <DigitView num = "9" color="#aaaaff"/>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}} >
        <DigitView num = "" color="white"/>
        <DigitView num = "0" color="lightgreen"/>
        <DigitView num = "" color="#fff"/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    margin:200,
    borderWidth:20,
    borderColor:"#00f",
  },
});

export default App;