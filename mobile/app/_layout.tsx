import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#F8F8F8',
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="score" />
      <Stack.Screen name="verdict" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

