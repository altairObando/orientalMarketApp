import { useUserData } from '@/data/UserStore';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react'
import { Text } from 'react-native-paper';

export default function Tab1(){
    const params = useLocalSearchParams();
    const setStoreId = useUserData(state => state.setStoreId);
    useEffect(()=>{
        setStoreId(Number(params.id || 0));
    },[params])
    return (
        <Text> Home dashboard for store number: { params.id }</Text>
    )
}