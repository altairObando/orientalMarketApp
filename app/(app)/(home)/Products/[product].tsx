import { View } from 'react-native';
import { Text } from 'react-native-paper';
import  { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react';
export default function ProductForm(){
    const local = useLocalSearchParams();
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.setOptions({
          headerRight: ()=> <Text> ALGO </Text> })
      },[navigation]);
    return <View>
        <Text> Product Form for id: {local.product} </Text>
    </View>
}