import { ModalMapPickerProps } from '@/interfaces/Map/MapLocation';
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { MapPicker } from './MapPicker';
import { Button } from 'react-native-paper';

export const ModalMapPicker: React.FC<ModalMapPickerProps>=({ visible, onClose, onSelectLocation, initialCoordinate })=>{
    return <Modal visible={ visible } transparent={ false }>
        <View style={ styles.container }>
            <MapPicker onSelectLocation={ onSelectLocation } />
            <Button style={ styles.btnUserSelection } mode='contained' onPress={ onClose }>
                Use this location
            </Button>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    btnUserSelection: {
        flex: 1,
        position: 'absolute',
        zIndex: 99,
        right: 25,
        bottom: 50,
    }
})