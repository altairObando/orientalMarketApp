import { ModalMapPickerProps } from '@/interfaces/Map/MapLocation';
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { MapPicker } from './MapPicker';

export const ModalMapPicker: React.FC<ModalMapPickerProps>=({ visible, onClose, onSelectLocation, initialCoordinate })=>{
    return <Modal visible={ visible } transparent={ false }>
        <View style={ styles.container }>
            <MapPicker onSelectLocation={ onSelectLocation } onClose={ onClose } initialCoordinate={ initialCoordinate }/>
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