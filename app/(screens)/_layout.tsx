import { Stack } from 'expo-router';

export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="find-myrtille" 
        options={{ 
          title: "Où est Myrtille ?",
          headerStyle: {
            backgroundColor: '#0066FF',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="monument-quiz" 
        options={{ 
          title: "Quiz des Monuments",
          headerStyle: {
            backgroundColor: '#0066FF',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="score" 
        options={{ 
          title: "Mon Score",
          headerStyle: {
            backgroundColor: '#0066FF',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
} 