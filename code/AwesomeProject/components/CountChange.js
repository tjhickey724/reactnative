import React,{useState} from 'react';
import {View, Button, Text} from 'react-native';

const App = () => {
    const [change,setChange] = useState(0)
    return (
      <View>
            <Text style = {{fontSize: 40}}>
                U.S. Change Counter
            </Text>
            <Text style = {{fontSize: 20}}>
                {change}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}} >
                <Button
                    title="Pennies"
                    onPress = {() => setChange(change+1)}
                />
                <Button
                    title="Nickels"
                    onPress = {() => setChange(change+5)}
                />
                <Button
                    title="Dimes"
                    onPress = {() => setChange(change+10)}
                />
                <Button
                    title="Quarters"
                    onPress = {() => setChange(change+25)}
                />
                <Button
                    title="Half Dollars"
                    onPress = {() => setChange(change+50)}
                />
            </View>
      </View>
    )
  }


export default App;
