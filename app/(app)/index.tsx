import { StoreList } from '@/components/Store/StoreList';
import { Store } from '@/interfaces/Store';
import { baseFetch } from '@/scripts/api';
import { AxiosResponse } from 'axios';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, IconButton } from 'react-native-paper';

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
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={ loading } onRefresh={ GetStores } />}>
      <View
        style={ styles.container }>
          <View style={ styles.logo }>
            <Icon size={50} source={'store-outline'} color='gray' />
          </View>
          <View style={{ flex: 2 }}>
            <Card mode='elevated' elevation={4} style={{ display: stores && stores.length > 0 ? 'flex': 'none' }}>
              <Card.Title title='Select your store' right={props => <IconButton {...props} icon='reload' onPress={ GetStores }/>} />
              <Card.Content>
                <StoreList 
                  storeItems={ stores }
                  refreshing= { loading }
                  onRefreshRequest={ GetStores }/>
              </Card.Content>
            </Card>
              <View style={{display: !stores || stores.length === 0 ? 'flex': 'none'}}>
                <Button onPress={ onNewStoreClick} mode='text'>Create a new Store </Button>
              </View>
          </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    rowGap: 25,
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    paddingTop: 25,
  },
})