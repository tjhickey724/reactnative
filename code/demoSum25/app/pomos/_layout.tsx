import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
          <Tabs.Screen
            name="pomodoros"
            options={{
              title: 'Pomodoro-Claude',
                    }}
          />
          <Tabs.Screen
            name="pomodorosG"
            options={{
              title: 'Pomodoro-Gemini',
                    }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home Sweet Home',
                    }}
          />

 
    </Tabs>
  );
}
