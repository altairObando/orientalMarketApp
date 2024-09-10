import { Store } from '@/interfaces/Store';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

interface StoreItemProps {
  item : Store
}

export const StoreItem: React.FC<StoreItemProps> = ({ item })=>{
    return <TouchableOpacity>
      <List.Item
        title={ item.storeName }
        description={ item.address1 }
        right={ props => <List.Icon icon='folder' { ...props }/>} />
    </TouchableOpacity>
}