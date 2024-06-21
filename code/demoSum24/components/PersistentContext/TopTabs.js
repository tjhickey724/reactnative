import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';
import ValueProvider from './ValueContext';


const Tab = createBottomTabNavigator();

export default function App() {
  const data = {username:'none',status:'admin'};

  return (
   <ValueProvider value={data}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
   </ValueProvider>
  );
}