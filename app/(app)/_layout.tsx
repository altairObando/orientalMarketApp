import { Redirect, Stack } from 'expo-router';
import { useUserData } from '@/data/UserStore';

export default function AppLayout(){
    const token  = useUserData( state => state.token );
    if(!token)
        return <Redirect href='/login' />
    return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index' />
  </Stack>
}