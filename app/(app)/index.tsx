import { StoreList } from '@/components/Store/StoreList';
import { Store } from '@/interfaces/Store';
import { baseFetch } from '@/scripts/api';
import { AxiosResponse } from 'axios';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';

export default function Index() {
  const navigation = useNavigation();
  const [ stores, setStores ] = useState<Store[] | null>(null);
  const [ loading, setLoading ] = useState(false);
  const GetStores =()=>{
    setLoading(true);
    baseFetch({ url: 'store/'}).then(response => {
      let result : AxiosResponse<Store[] | null> = response;
      if(result.status == 200 )
        setStores(result.data);
    }).finally( ()=> {
      setLoading(false);
    })
  }
  useEffect(()=>{
    navigation.setOptions({
      headerRight: ()=> <Button mode='text' onPress={ onNewStoreClick }>
        <Icon source='plus' size={20} />
      </Button>
    })
  },[navigation]);
  useEffect(()=>{
    GetStores();
  },[]);
  const onNewStoreClick=()=>{
    router.push('/newStore')
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        justifyContent: 'center',
      }}>
        <View style={{ alignSelf: 'center'}}>
          <Icon size={50} source={'store-outline'} color='gray' />
        </View>
        <Card mode='elevated' elevation={4} style={{ display: stores && stores.length > 0 ? 'flex': 'none' }}>
          <Card.Title title='Select your store' />
          <Card.Content>
            <StoreList 
              storeItems={ stores }
              refreshing= { loading }
              onRefreshRequest={ GetStores }/>
          </Card.Content>
        </Card>
        <Text style={{ 
          alignSelf: 'center',
          display: !stores ? 'flex': 'none'
        }}>Create a new Store </Text>
    </View>
  );
}
