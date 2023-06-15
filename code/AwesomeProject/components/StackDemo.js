import * as React from 'react';
import {Button,Text,View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CountChange from './CountChange';
import UsernameContext from './UsernameContext';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    return (
     <View>
            <Button
                title="Go to Tim's profile"
                onPress={() =>
                navigation.navigate('Profile', {name: 'Tim'})
                }
            />
            <Button
                title="Count Change"
                onPress={() =>
                navigation.navigate('CountChange') 
                }
            />
      </View>
    );
  };
  const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

  // use value={{apikey:'7d8s97f89dsfsd',username:'tjhickey'}}
const MyStack = () => {
  return (
   <UsernameContext.Provider value="tjhickey">
      
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CountChange" component={CountChange} />
      </Stack.Navigator>
    </NavigationContainer>
   </UsernameContext.Provider>
  );
};

export default MyStack;
