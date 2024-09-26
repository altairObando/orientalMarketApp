import React, { useState } from 'react';
import { StoreForm } from '@/components/Store/StoreForm';
import { extractStoreError, StoreError } from '@/interfaces/Errors/StoreError';
import { Store } from '@/interfaces/Store';
import { createNewStore } from '@/scripts/Store';
import { useHeaderHeight } from '@react-navigation/elements';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import { MD3Colors, ProgressBar } from 'react-native-paper';
export default function newStoreForm() {
    // const navigation = useNavigation();
    const [userData, setUserData] = useState<Store>({} as Store);
    const [formErrors, setFormErrors ] = useState<StoreError>({} as StoreError );
    const [ saving, setSaving ] = useState(false);
    const onSaveStorePress = ()=> {
        setSaving(true)
        createNewStore(userData).then(newStore => router.replace({ pathname: '/tab1', params: { id: newStore.id } }))
        .catch( error => {
            if( error instanceof AxiosError ){
                const errors: StoreError = extractStoreError(error.response?.data ?? {} );
                setFormErrors(errors)
            }
        }).finally(()=>{
            setSaving(false)
        })
    }
    const height = useHeaderHeight();
    return <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={height + 50 }
        style={{ flex: 1 }}
        enabled>
        <ScrollView style={{ flex: 1 }}>
            { saving && <ProgressBar  indeterminate color={ MD3Colors.primary0 } />}
            <StoreForm
              formErrors={ formErrors }
              userData={ userData }
              setUserData={ setUserData }
              onSaveStorePress={ onSaveStorePress }
              disabled={ saving }/>
        </ScrollView>
    </KeyboardAvoidingView>
}