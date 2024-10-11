import { Stack } from 'expo-router';

export default function AppLayout(){
    return <Stack>
    <Stack.Screen name='index'/>
    <Stack.Screen name='[product]' options={{
      title: '',
      headerBackTitle: 'Choose your product'
    }}/>
  </Stack>
}