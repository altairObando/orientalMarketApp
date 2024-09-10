import { ModalMapPicker } from '@/components/Maps/ModalMapPicker';
import { Coordinate } from '@/interfaces/Map/MapLocation';
import { Store } from '@/interfaces/Store';
import { useHeaderHeight } from '@react-navigation/elements';
import * as Location from 'expo-location';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Icon, TextInput } from 'react-native-paper';

export default function newStoreForm() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState<Coordinate | null>();
    const [userData, setUserData] = useState<Store>({} as Store);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button mode='text' onPress={ onSaveStorePress }> Save </Button>
        })
    }, [navigation]);
    const onSaveStorePress = ()=> {
        console.log('initialData', userData)
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
                        onChangeText={newValue => updateStoreField(newValue, 'idNumber')}/>
                    {/* <HelperText type='error' visible={true}>
                        Registration Number Error
                    </HelperText> */}
                </View>
                <TextInput 
                    mode='outlined' 
                    label='Store Name' 
                    left={<TextInput.Icon icon='format-color-text' />} 
                    value={userData.storeName}
                    onChangeText={newValue => updateStoreField(newValue, 'storeName')}
                    />
                <TextInput mode='outlined' label='Store Description' multiline={true} numberOfLines={5} left={<TextInput.Icon icon='format-color-text' />} value={userData.storeDesc} onChangeText={newValue => updateStoreField(newValue, 'storeDesc')} />
                <Divider style={{ marginTop: 14 }} />
                <Button icon={() => <Icon source={'map'} size={30} />} onPress={onLocationPress}>
                    Pick Your Location
                </Button>
                <TextInput
                    mode='outlined'
                    label='Latitude'
                    readOnly={true}
                    value={userData.latitude}
                    right={<TextInput.Icon icon='map-marker' />} />
                <TextInput
                    mode='outlined'
                    label='Longitude'
                    readOnly={true}
                    value={userData.longitude}
                    right={<TextInput.Icon icon='map-marker' />} />
                <TextInput
                    mode='outlined'
                    label='Address 1'
                    left={<TextInput.Icon icon='city' />}
                    value={userData.address1}
                    onChangeText={newValue => updateStoreField(newValue, 'address1')}
                    multiline
                    numberOfLines={4}
                />
                <TextInput
                    mode='outlined'
                    label='Address 2'
                    left={<TextInput.Icon icon='city' />}
                    value={userData.address2}
                    onChangeText={newValue => updateStoreField(newValue, 'address2')}
                    multiline
                    numberOfLines={4} />
                <TextInput 
                    keyboardType='email-address' 
                    mode='outlined'
                    label='E-mail'
                    left={<TextInput.Icon icon='mail' />}
                    value={userData.email} 
                    onChangeText={newValue => updateStoreField(newValue, 'email')}
                    autoCapitalize='none' />
                <TextInput 
                    keyboardType='phone-pad'
                    mode='outlined'
                    label='Phone Number'
                    left={<TextInput.Icon icon='phone-dial' />}
                    value={userData.phone}
                    onChangeText={newValue => updateStoreField(newValue, 'phone')} />
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
