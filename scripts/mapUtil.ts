import { MapLocation } from '@/interfaces/Map/DeltaResult';
/**
 * Calcula la distania delta para latitud y longitud en base a una ubicación y area a la redonda
 * @param { Number } latitude Latitud de la zona
 * @param { Number } distance Area redonda en km, por ejemplo 10 (Mostrar un área de 10 km de ancho y alto)
 * @returns 
 */
function calculateDelta(latitude: number, longitude: number, distance: number){
    const earthRadius = 6371; 
    const latitudeDelta = distance / earthRadius;
    const longitudeDelta = distance / (earthRadius * Math.cos((Math.PI * latitude) / 180));
    return {
        latitude,
        longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    } as MapLocation;
}


export default calculateDelta