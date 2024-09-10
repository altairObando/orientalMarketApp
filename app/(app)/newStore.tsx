import { ModalMapPicker } from '@/components/Maps/ModalMapPicker';
import { Coordinate } from '@/interfaces/Map/MapLocation';
import { Store } from '@/interfaces/Store';
import { createNewStore } from '@/scripts/Store';
import { useHeaderHeight } from '@react-navigation/elements';
import { AxiosError } from 'axios';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Icon, TextInput } from 'react-native-paper';
import { extractStoreError, StoreError } from '@/interfaces/Errors/StoreError'
export default function newStoreForm() {
    // const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<Coordinate | null>();
    const [userData, setUserData] = useState<Store>({} as Store);
    const [formErrors, setFormErrors ] = useState<StoreError>({} as StoreError );
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => <Button mode='text' onPress={ onSaveStorePress }> Save </Button>
    //     })
    // }, [navigation]);
    const onSaveStorePress = ()=> {
        console.log( userData )
        createNewStore(userData).then(newStore => console.log(newStore))
        .catch( error => {
            if( error instanceof AxiosError ){
                const errors: StoreError = extractStoreError(error.response?.data ?? {} );
                setFormErrors(errors)
            }
        });
    }
    const onLocationPress = () => setModalVisible(true);
    const onLocationClose = async () => {
        if (userLocation == null) return;
        setModalVisible(false)
        const response = await Location.reverseGeocodeAsync({ latitude: userLocation.latitude, longitude: userLocation.longitude });
        const [reverse] = response;
        setUserData({
            ...userData,
            address1: reverse.name ?? '',
            address2: reverse.street ?? '',
            latitude: userLocation.latitude.toString(),
            longitude: userLocation.longitude.toString(),
        });
    }
    const updateStoreField = (value: any, fieldName: string) => setUserData(current => ({...current, [fieldName]: value }));
    const height = useHeaderHeight();
    return <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height' }
        keyboardVerticalOffset={height + 50 }
        style={{ flex: 1 }}
        enabled>
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Registration Number'
                        left={<TextInput.Icon icon='barcode' />}
                        value={userData.idNumber}
                        onChangeText={newValue => updateStoreField(newValue, 'idNumber')}
                        error={ formErrors?.idNumber?.hasError ?? false }/>
                    {(formErrors?.idNumber?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.idNumber?.hasError ?? false }>
                        { formErrors?.idNumber?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Store Name'
                        left={<TextInput.Icon icon='format-color-text' />}
                        value={userData.storeName}
                        onChangeText={newValue => updateStoreField(newValue, 'storeName')}
                        error={ formErrors?.storeName?.hasError ?? false }/>
                    { (formErrors?.storeName?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.storeName?.hasError ?? false }>
                        { formErrors?.storeName?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Store Description'
                        multiline={true}
                        numberOfLines={5}
                        left={<TextInput.Icon icon='format-color-text' />}
                        value={userData.storeDesc}
                        onChangeText={newValue => updateStoreField(newValue, 'storeDesc')}
                        error={ formErrors?.storeDesc?.hasError ?? false }/>
                    { (formErrors?.address2?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.storeDesc?.hasError ?? false }>
                        { formErrors?.storeDesc?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <Divider style={{ marginTop: 14 }} />
                <Button icon={() => <Icon source={'map'} size={30} />} onPress={onLocationPress}>
                    Pick Your Location
                </Button>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Latitude'
                        readOnly={true}
                        value={userData.latitude}
                        right={<TextInput.Icon icon='map-marker' />}
                        error={ formErrors?.latitude?.hasError ?? false }/>
                    {(formErrors?.latitude?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.latitude?.hasError ?? false }>
                        { formErrors?.latitude?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Longitude'
                        readOnly={true}
                        value={userData.longitude}
                        right={<TextInput.Icon icon='map-marker' />}
                        error={ formErrors?.longitude?.hasError ?? false }/>
                    {(formErrors?.longitude?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.longitude?.hasError ?? false }>
                        { formErrors?.longitude?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <View>
                    <TextInput
                        mode='outlined'
                        label='Address 1'
                        left={<TextInput.Icon icon='city' />}
                        value={userData.address1}
                        onChangeText={newValue => updateStoreField(newValue, 'address1')}
                        multiline
                        numberOfLines={4}
                        error={ formErrors?.address1?.hasError ?? false }/>
                        {(formErrors?.address1?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.address1?.hasError ?? false }>
                            { formErrors?.address1?.errorMsg ?? ''}
                        </HelperText>}
                </View>
                <View>    
                    <TextInput
                        mode='outlined'
                        label='Address 2'
                        left={<TextInput.Icon icon='city' />}
                        value={userData.address2}
                        onChangeText={newValue => updateStoreField(newValue, 'address2')}
                        multiline
                        numberOfLines={4}
                        error={ formErrors?.address2?.hasError ?? false }/>
                        {(formErrors?.address2?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.address2?.hasError ?? false }>
                            { formErrors?.address2?.errorMsg ?? ''}
                        </HelperText>}
                </View>
                <View>
                    <TextInput
                        keyboardType='email-address'
                        mode='outlined'
                        label='E-mail'
                        left={<TextInput.Icon icon='mail' />}
                        value={userData.email}
                        onChangeText={newValue => updateStoreField(newValue, 'email')}
                        autoCapitalize='none'
                        error={ formErrors?.email?.hasError ?? false }/>
                    {(formErrors?.email?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.email?.hasError ?? false }>
                        { formErrors?.email?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <View>
                    <TextInput
                        keyboardType='phone-pad'
                        mode='outlined'
                        label='Phone Number'
                        left={<TextInput.Icon icon='phone-dial' />}
                        value={userData.phone}
                        onChangeText={newValue => updateStoreField(newValue, 'phone')}
                        error={ formErrors?.phone?.hasError ?? false }/>
                    { (formErrors?.phone?.hasError ?? false ) && <HelperText type='error' visible={ formErrors?.phone?.hasError ?? false }>
                        { formErrors?.phone?.errorMsg ?? ''}
                    </HelperText>}
                </View>
                <Button mode='text' onPress={onSaveStorePress}> Save </Button>
            </View>
        </ScrollView>
        <ModalMapPicker
            visible={modalVisible}
            onClose={onLocationClose}
            onSelectLocation={(location: Coordinate) => setUserLocation(location)} />
    </KeyboardAvoidingView>
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: 10,
        rowGap: 10
    },
    formStyle: {
        display: 'flex',
        rowGap: 5,
    }
})
