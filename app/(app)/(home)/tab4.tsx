import { StoreForm } from '@/components/Store/StoreForm';
import { StoreError } from '@/interfaces/Errors/StoreError';
import { Store } from '@/interfaces/Store';
import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { baseFetch } from '@/scripts/api';
import { AxiosResponse } from 'axios';

export default function Tab1(){
    const { id = 0 } = useGlobalSearchParams();
    // const navigation = useNavigation();
    const [userData, setUserData] = useState<Store>({} as Store);
    const [formErrors, setFormErrors ] = useState<StoreError>({} as StoreError );
    const [ loading, setLoading] = useState(false);
    const onSaveStorePress =()=>{}
    const GetStores =()=>{
        if(!id || Number(id) == 0) return
        setLoading(true);
        baseFetch({ url: `store/${ id }`}).then(response => {
            let result : AxiosResponse<Store | null> = response;
            if(result.status == 200 )
            setUserData(result.data?? {} as Store);
        }).finally( ()=> {
            setLoading(false);
        })
    }
    useEffect(()=>{
        GetStores()
    },[ id ])
    //TODO: Fetch the store using the id
    //TODO: ADD Contact page
    if(!id)
        return <RefreshControl  refreshing/>
    return <>
        <StoreForm
              formErrors={ formErrors }
              userData={ userData }
              setUserData={ setUserData }
              onSaveStorePress={ onSaveStorePress }/>
    </>
}