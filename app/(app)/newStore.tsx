import { ModalMapPicker } from '@/components/Maps/ModalMapPicker';
import { Coordinate } from '@/interfaces/Map/MapLocation';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Divider, Icon, Text, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import { Store } from '@/interfaces/Store';

export default function newStoreForm(){
    const navigation = useNavigation();
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ userLocation, setUserLocation ] = useState<Coordinate | null >();
    const [ userData, setUserData ] = useState<Store>({} as Store);
    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=> <Button mode='text'> Save </Button>
        })
    },[navigation]);
    const onLocationPress=()=> setModalVisible( true );
    const onLocationClose= async()=>{
        if(userLocation == null) return;
        setModalVisible(false)
        const response = await Location.reverseGeocodeAsync({ latitude: userLocation.latitude, longitude: userLocation.longitude });
        const [ reverse ] = response;
        setUserData({
            ...userData, 
            address1: reverse.name ?? '', 
            address2: reverse.street ?? '',
            latitude: userLocation.latitude.toString(),
            longitude: userLocation.longitude.toString(),
        });
    }
    const updateStoreField =( value : any, fieldName: string )=>{
        setUserData({...userData, [fieldName]: value })
    }
    return <View style={ styles.container }>
        <Card>
            <Card.Title 
                title='Basic Information'
                right={props => <Avatar.Icon {...props} icon='store-outline' /> }
                style={{ padding: 10 }}/>
            <Card.Content style={styles.formStyle}>
                <TextInput mode='outlined' label='Registration Number' left={ <TextInput.Icon icon='barcode'/> } value={ userData.idNumber } onChangeText={ newValue => updateStoreField(newValue, 'idNumber')}/>
                <TextInput mode='outlined' label='Store Name' left={<TextInput.Icon icon='format-color-text' /> } value={ userData.storeName }  onChangeText={ newValue => updateStoreField(newValue, 'storeName')}/>
                <TextInput mode='outlined' label='Store Description' multiline={true} numberOfLines={5} left={<TextInput.Icon icon='format-color-text' /> } value={ userData.storeDesc } onChangeText={ newValue => updateStoreField(newValue, 'storeDesc')}/>
                <Divider style={{ marginTop: 14 }}/>
                <Button icon={ ()=> <Icon source={'map'} size={30}/> } onPress={ onLocationPress }>
                    Pick Your Location
                </Button>
                <TextInput 
                    mode='outlined'
                    label='Latitude'
                    readOnly={true}
                    value={ userData.latitude }
                    right={ <TextInput.Icon icon='map-marker' />}/>
                <TextInput 
                    mode='outlined'
                    label='Longitude'
                    readOnly={true}
                    value={ userData.longitude }
                    right={ <TextInput.Icon icon='map-marker' />}/>
                <TextInput 
                    mode='outlined'
                    label='Address 1'
                    left={ <TextInput.Icon icon='city' /> }
                    value={ userData.address1 }
                    onChangeText={ newValue => updateStoreField(newValue, 'address1')}
                    multiline
                    numberOfLines={4}
                    />
                <TextInput 
                    mode='outlined' 
                    label='Address 2'
                    left={ <TextInput.Icon icon='city' /> } 
                    value={ userData.address2 } 
                    onChangeText={ newValue => updateStoreField(newValue, 'address2')}
                    multiline
                    numberOfLines={4}/>
                <TextInput mode='outlined' label='E-mail' left={ <TextInput.Icon icon='mail' /> } value={ userData.email } onChangeText={ newValue => updateStoreField(newValue, 'idNumber')}/>
                <TextInput mode='outlined' label='Phone Number' left={ <TextInput.Icon icon='phone-dial' /> } value={ userData.phone }onChangeText={ newValue => updateStoreField(newValue, 'idNumber')}/>
                <Button mode='text'> Save </Button>
            </Card.Content> 
        </Card>
        <ModalMapPicker
            visible={ modalVisible }
            onClose={ onLocationClose }
            onSelectLocation={ (location: Coordinate ) =>  setUserLocation(location) } />
    </View>
}
const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: 10,
        rowGap: 10
    },
    formStyle:{
        display: 'flex',
        rowGap: 5,
    }
})
