import { baseFetch } from '@/scripts/api';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
export default function Index() {
  useEffect(()=>{
    baseFetch({ url: 'store/'}).then(response => console.log('userstores', response.data));
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this kkk.</Text>
    </View>
  );
}
