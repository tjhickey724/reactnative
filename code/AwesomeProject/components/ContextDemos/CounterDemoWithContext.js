import React,{useState} from 'react';
import {View,Text} from 'react-native';
import NamedCounterWithContext from './NamedCounterWithContext';
import {useValue} from './ValueContext'

export default function CounterDemo() {
  

    const {currentValue,setCurrentValue} = useValue();
  
    return (
      <View>
        <Text> New Counter Demo with Context</Text>
        <Text>Total value is ${currentValue.total / 100} </Text>
        <Text>Total amount of coins are {currentValue.count} </Text>
  
        <View style={{ flexDirection: "row" }}>
          <NamedCounterWithContext label="Penny" value={1}  />
          <NamedCounterWithContext label="Nickel" value={5} />
          <NamedCounterWithContext label="Dime" value={10}  />
          <NamedCounterWithContext label="Quarter" value={25}  />
        </View>
        <Text>{JSON.stringify(currentValue.log)}</Text>
      </View>
  
    );
  }