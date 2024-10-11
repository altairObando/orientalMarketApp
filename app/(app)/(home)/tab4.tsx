import { StoreForm } from '@/components/Store/StoreForm';
import { extractStoreError, StoreError } from '@/interfaces/Errors/StoreError';
import { Store } from '@/interfaces/Store';
import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, RefreshControl, Platform, ScrollView, Alert, View, StyleSheet } from 'react-native';
import { baseFetch } from '@/scripts/api';
import { AxiosError, AxiosResponse } from 'axios';
import { updateStore } from '@/scripts/Store';
import { useHeaderHeight } from '@react-navigation/elements';
import { Icon, List, ProgressBar, Text } from 'react-native-paper';

export default function Tab1(){
    const { id = 0 } = useGlobalSearchParams();
    // const navigation = useNavigation();
    const [ userData, setUserData ] = useState<Store>({} as Store);
    const [ formErrors, setFormErrors ] = useState<StoreError>({} as StoreError );
    const [ loading, setLoading ] = useState(false);
    const [ groupSelect, setGroupSelect ] = useState<string | number>('1');
    const onSaveStorePress =()=>{
        setLoading(true);
        setFormErrors({} as StoreError);
        updateStore(userData).then(response => {
            console.log(response);
            Alert.alert('Completed', 'Store information updated')
        })
        .catch(error => {
            if( error instanceof AxiosError ){
                const errors: StoreError = extractStoreError(error.response?.data ?? {} );
                setFormErrors(errors)
                Alert.alert('Error', 'Please check form errors')
            }
        })
        .finally( ()=> setLoading(false));
    }
    const GetStores =()=>{
        if(!id || Number(id) == 0) return
        setLoading(true);
        baseFetch({ url: `store/${ id }/`}).then(response => {
            let result : AxiosResponse<Store | null> = response;
            if(result.status == 200 )
            setUserData(result.data?? {} as Store);
        }).catch(error => {
            if( error instanceof AxiosError){
                console.log(error.request.headers)
            }
        })
        .finally( ()=> {
            setLoading(false);
        })
    }
    useEffect(()=>{
        GetStores()
    },[ id ])
    if(!id) return <RefreshControl  refreshing/>
    const height = useHeaderHeight();
    return <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={height + 50 }
        style={{ flex: 1, backgroundColor: 'white' }}
        enabled>
        <ScrollView>
            <ProgressBar indeterminate visible={ loading } />
            <View style={ styles.logo }>
                <Icon size={100} source={'store-outline'} color='gray' />
            </View>
            <List.AccordionGroup expandedId={groupSelect} onAccordionPress={ ( expandedId )=> {
                if( expandedId !== groupSelect) setGroupSelect(expandedId)
                else setGroupSelect('0')
            } }>
                <List.Accordion title='Store Info' id='1'>
                    <StoreForm
                        formErrors={ formErrors }
                        userData={ userData }
                        setUserData={ setUserData }
                        onSaveStorePress={ onSaveStorePress }
                        disabled={ loading }/>
                </List.Accordion>
                <List.Accordion title='Contact Info' id='2'>
                    <Text> Legal Representant</Text>
                </List.Accordion>
            </List.AccordionGroup>
        </ScrollView>
    </KeyboardAvoidingView>
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