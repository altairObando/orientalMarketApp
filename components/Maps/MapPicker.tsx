import { Coordinate, MapLocation } from '@/interfaces/Map/MapLocation';
import calculateDelta from '@/scripts/mapUtil';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MapPressEvent, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Text, Button } from 'react-native-paper';

interface MapPickerProps {
  onSelectLocation: (location: Coordinate) => void;
  initialCoordinate?: Coordinate | null,
  onClose: () => void;
}

export const MapPicker: React.FC<MapPickerProps>=({ onSelectLocation, initialCoordinate, onClose })=>{
    const [ locationPermision, setLocationPermission ] = useState<Location.PermissionStatus | null>();
    const [ userLocation, setUserLocation ] = useState<MapLocation>();
    const [ marker, setMarker] = useState<Coordinate>({ latitude: 0, longitude: 0 });
    const [ errorMsg, setErrorMsg ] = useState<String>();
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          setLocationPermission(status);
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }    
          let location: Location.LocationObject = await Location.getCurrentPositionAsync({});
          const{ coords } = location;
          const mapLocation: MapLocation = calculateDelta( coords.latitude, coords.longitude, 50);
          setUserLocation(mapLocation);
          onSelectLocation(mapLocation);
          setMarker({ latitude: mapLocation.latitude, longitude: mapLocation.longitude })
        })();
      }, []);
    const handleMapPress = async (event: MapPressEvent) => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setMarker({ latitude, longitude });
      if(typeof onSelectLocation === 'function'){
          onSelectLocation(event.nativeEvent.coordinate);
      }
    };
    useEffect(()=>{
      if(typeof initialCoordinate === 'undefined' || initialCoordinate == null || (initialCoordinate.latitude == 0)) return;
      const initial = calculateDelta(initialCoordinate.latitude, initialCoordinate.longitude, 50);
      setUserLocation(initial);
    },[initialCoordinate])
    if(locationPermision != Location.PermissionStatus.GRANTED)
        return <View style={ styles.container }>
            <Text> { errorMsg || 'Without location permission' } </Text>
        </View>
    return <View style={styles.container}>
        <MapView 
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            onPress={handleMapPress}
            showsUserLocation={true}
            showsMyLocationButton={true}            
            showsTraffic
            initialRegion={ userLocation }>
            <Marker
              coordinate={ marker }
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setMarker({ latitude, longitude });
                if (typeof onSelectLocation === 'function') {
                  onSelectLocation(e.nativeEvent.coordinate);
                }
              }} />
        </MapView>
        { userLocation && <Button style={ styles.btnUserSelection } mode='contained' onPress={ onClose}>
                Use this location
        </Button> }
    </View>
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    btnUserSelection: {
      flex: 1,
      position: 'absolute',
      zIndex: 99,
      right: 25,
      bottom: 50,
  }
});