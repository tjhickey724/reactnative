import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
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