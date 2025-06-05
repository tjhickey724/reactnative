# Running ReactNative Locally

We showed how to setup the local environment to develop React Native apps using Visual Studio Code.
Then we looked over some of the Javascript documentation.
Steps:
#### install npm
Visit nodejs.org and follow the instructions

#### load libraries to create an app
``` bash
% npm i -g create-react-native-app
% create-react-native-app my_first_rn_app --use-npm
% cd my_first_rn_app
% npm start
```

If this doesn't work then you can create a react native app on the web
by going to [https://snack.expo.dev/](https://snack.expo.dev/)

#### Edit App.js in vscode
 We can try all of our Snack examples here...
 ``` javascript

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

```
if the Counter is in components/Counter.js
then we rewrite App.js to be
``` javascript
 import React from 'react';
//import {Counter} from './components/Counter';// import non-default export
import Counter from './components/Counter'; // importing default export
import {Text} from 'react-native';

export default function App() {

  return (
    <Counter>
      <Text>Tim's Really New Counter</Text>
    </Counter>
  );
}

```

### Another component TextBox
``` javascript
import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

const TextBox = ({info}) => {
    return (
        <View style={styles.container}>
        <Text>{info}</Text>
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

export default TextBox;
```


#### Move components to their own files
We can create a components folder for special components

#### Initial Stack Navigator App code 
``` javascript

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```
