import React from 'react';
import { Text, View } from 'react-native';
import {useValue} from './ValueContext';

function HomeScreen() {
    const {currentValue} = useValue();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Text>Username: {currentValue['username']}</Text>
        <Text>Status: {currentValue['admin']}</Text>
      </View>
    );
  }

export default HomeScreen;

  