import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: '🎯 TruthBeTold',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="score" 
        options={{ 
          title: 'Your Score',
          headerShown: true,
        }} 
      />
      <Stack.Screen
        name="verdict"
        options={{
          title: 'Full Verdict',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="+not-found"
        options={{
          title: 'Not Found',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

