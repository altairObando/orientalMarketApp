import { ModalMapPicker } from '@/components/Maps/ModalMapPicker';
import { StoreError } from '@/interfaces/Errors/StoreError';
import { Coordinate } from '@/interfaces/Map/MapLocation';
import { Store } from '@/interfaces/Store';
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, HelperText, Icon, TextInput } from 'react-native-paper';

interface StoreFormProps {
    onSaveStorePress: ()=>void;
    formErrors: StoreError;
    userData: Store;
    setUserData: React.Dispatch<React.SetStateAction<Store>>;
    disabled? : boolean
}

export const StoreForm: React.FunctionComponent<StoreFormProps> =({ formErrors, onSaveStorePress, userData, setUserData, disabled })=>{
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<Coordinate | null>();
    const updateStoreField = (value: any, fieldName: string) => setUserData( prevState => ({...prevState, [fieldName] : value } as Store ));
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
    return <View style={styles.container}>
        <View>
            <TextInput
                mode='outlined'
                label='Registration Number'
                left={<TextInput.Icon icon='barcode' />}
                value={userData.idNumber}
                onChangeText={newValue => updateStoreField(newValue, 'idNumber')}
                error={ formErrors?.idNumber?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.storeName?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.storeDesc?.hasError ?? false }
                disabled={disabled}/>
            { (formErrors?.address2?.hasError ?? false) && <HelperText type='error' visible={ formErrors?.storeDesc?.hasError ?? false }>
                { formErrors?.storeDesc?.errorMsg ?? ''}
            </HelperText>}
        </View>
        <Divider style={{ marginTop: 14 }} />
        <Button  disabled={disabled} icon={() => <Icon source={'map'} size={30} />} onPress={onLocationPress}>
            Pick Your Location
        </Button>
        <View>
            <TextInput
                mode='outlined'
                label='Latitude'
                readOnly={true}
                value={userData.latitude}
                right={<TextInput.Icon icon='map-marker' />}
                error={ formErrors?.latitude?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.longitude?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.address1?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.address2?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.email?.hasError ?? false }
                disabled={disabled}/>
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
                error={ formErrors?.phone?.hasError ?? false }
                disabled={disabled}/>
            { (formErrors?.phone?.hasError ?? false ) && <HelperText type='error' visible={ formErrors?.phone?.hasError ?? false }>
                { formErrors?.phone?.errorMsg ?? ''}
            </HelperText>}
        </View>
        <Button mode='text' onPress={onSaveStorePress} disabled={disabled}> Save </Button>
        <ModalMapPicker
            visible={modalVisible}
            onClose={onLocationClose}
            initialCoordinate={ {
                latitude: Number(userData.latitude || 0),
                longitude: Number(userData.longitude || 0)
            } as Coordinate 
        } onSelectLocation={(location: Coordinate) => setUserLocation(location)} />
    </View>
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
