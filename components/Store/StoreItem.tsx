import { Store } from '@/interfaces/Store';
import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

interface StoreItemProps {
  item : Store
}

export const StoreItem: React.FC<StoreItemProps> = ({ item })=>{
    return <TouchableOpacity>
      <Link href={{
        pathname: '/tab1',
        params: { id: item.id }
      }} asChild >
        <List.Item
          title={ item.storeName }
          description={ item.address1 }
          right={ props => <List.Icon icon='store' { ...props }/>}/>
      </Link>
    </TouchableOpacity>
}