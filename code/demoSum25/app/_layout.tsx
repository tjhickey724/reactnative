import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {

  return (
    <>
      <Stack
            screenOptions={{
                headerShown: false, 
                }}
      >
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}