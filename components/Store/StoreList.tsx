import React from 'react';
import { Store } from '@/interfaces/Store';
import { FlatList, RefreshControl } from 'react-native';
import { StoreItem } from './StoreItem';
interface StoreListProps {
    storeItems : Store[] | null;
    onRefreshRequest: ()=> void;
    refreshing: boolean;
}

export const StoreList:React.FC<StoreListProps>=({ storeItems, refreshing, onRefreshRequest  })=>{
    return <FlatList
     data={ storeItems }
     renderItem={ ({ item }) => <StoreItem item={item}/> }
     keyExtractor={ item => item.id.toString() }
     refreshControl={ <RefreshControl refreshing={ refreshing }  onRefresh={ onRefreshRequest }/>}
    />
}