export interface MapLocation { 
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface ModalMapPickerProps {
    visible: boolean;
    onClose: () => void;
    onSelectLocation: (location: Coordinate) => void;
    initialCoordinate: Coordinate | null
}