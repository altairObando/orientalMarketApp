import React from 'react';
import { Store } from '@/interfaces/Store';
import { FlatList } from 'react-native';
import { StoreItem } from './StoreItem';
interface StoreListProps {
    storeItems : Store[] | null
}

export const StoreList:React.FC<StoreListProps>=({ storeItems })=>{
    return <FlatList
     data={ storeItems }
     renderItem={ ({ item }) => <StoreItem item={item}/> }
     keyExtractor={ item => item.id.toString() }
    />
}