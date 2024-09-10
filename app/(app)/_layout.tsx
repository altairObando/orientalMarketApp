import { Redirect, Stack } from 'expo-router';
import { useUserData } from '@/data/UserStore';

export default function AppLayout(){
    const token  = useUserData( state => state.token );
    if(!token) return <Redirect href='/login' />
    return <Stack>
    <Stack.Screen name='index' options={{ headerBackTitle: 'Chose Store', title:'Chose Store' }}/>
    <Stack.Screen name='newStore' options={{ 
        title: 'New Store',
        headerShown: true,
      }}/>
  </Stack>
}