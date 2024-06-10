# Context

To share data between components we can use the useContext hook.
First include the following file, ValueContext.js in your components:

``` javascript
import React, { useState, useContext, createContext } from "react";

export const ValueContext = createContext(null)

export const ValueProvider = ({value, children}) => {
  const [currentValue,setCurrentValue] = useState(value);

  return (
    <ValueContext.Provider
        value={{currentValue,setCurrentValue}} >
      {children}
    </ValueContext.Provider>
   )
}
export default ValueProvider
export const useValue = () => useContext(ValueContext)
```

Then wrap the top level of your component with a ValueProvider from ValueContext:

``` javascript
import React, { useState } from "react";
import ValueProvider from './ValueContext';
import CounterDemoWithContext from './CounterDemoWithContext'

const App = () => {
  const data = {total:0, count:0, log:[]}

  return (
    <ValueProvider value={data}>
        <CounterDemoWithContext />
    </ValueProvider>
  )
}

export default App
```
Note that in this case, we are sharing a JSON object with three fields: total, count, and log

To access this data use the useValue function from ValueContext, for any component that needs the value
``` javascript
// CounterDemoWithContext.js
import React,{useState} from 'react';
import {View,Text} from 'react-native';
import NamedCounterWithContext from './NamedCounterWithContext';
import {useValue} from './ValueContext'

export default function CounterDemo() {
  

    const {currentValue} = useValue();
  
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
```

To modify the context we use the setCurrentValue function
``` javascript
# NamedCounterWithContext.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {useValue} from './ValueContext';


const NamedCounterWithContext = ({ label, value, updateTotal }) => {
    const {currentValue,setCurrentValue} = useValue();

  const [count, setCount] = useState(0);
  const [coins, setCoins] = useState(0);

  return (
    <View style={styles.container}>

      <Text>The coin count is {coins}, </Text>
      <Text>The counter value is ${count / 100} </Text>
      <View style={styles.buttonView}>
        <Button
          title={label}
          color="blue"
          onPress={() => {
            setCount((count + value));
            setCurrentValue(
                {total:currentValue.total+value,
                 count:currentValue.count+1,
                 log: currentValue.log.concat([value]) })
            setCoins(coins + 1);
            }
          }
        />

        <Button
          title={label}
          color="red"
          onPress={() => {
            setCount((count - value));
            setCurrentValue(
                {total:currentValue.total-value,
                 count:currentValue.count-1,
                 log: currentValue.log.concat([-value]) })
            setCoins(coins - 1);
            }
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttonView: {
    flexDirection: "row"
  }

});
export default NamedCounterWithContext;
```

