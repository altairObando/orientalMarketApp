import { Stack } from 'expo-router';

export default function AppLayout(){
    return <Stack>
    <Stack.Screen name='index' options={{ headerShown: false }}/>
    <Stack.Screen name='[product]' options={{
      title: 'Choose your product',
      headerBackTitle: 'Choose your product'
    }}/>
  </Stack>
}