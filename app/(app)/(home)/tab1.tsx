import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

export default function Tab1(){
    const { id = 0 } = useLocalSearchParams();
    return (
        <View style={{ display: 'flex', flex: 1, padding: 5 }}>
            <Card style={{ flex: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
                    <Image 
                        source={{ uri: 'https://m.media-amazon.com/images/I/61Bue23QpZL._AC_SX466_.jpg'}}
                        style={{ width: 100, height: 100, alignSelf: 'flex-start', resizeMode: 'stretch' }}/>
                    <View style={{ padding: 10, flex: 1, flexDirection: 'column', justifyContent:'space-between', gap: 10 }}>
                        <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row'}}>
                            <Text style={{ flex: 1, width: 1 }}>{'Auriculares inalámbricos para juegos de 2.4 GHz para PC, PS4, PS5, Mac, Nintendo Switch, auriculares Bluetooth 5.2 para juegos con micrófono de cancelación de ruido, sonido estéreo, solo modo'.substring(0,100) +'...'}</Text>
                        </View>
                        <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                gap: 15,
                                justifyContent:'space-around',
                                backgroundColor: 'cyan',
                                alignItems: 'center'
                            }}>
                            <Text>C$ 2,500.34</Text>
                            <Text>Cupon#54654231</Text>
                        </View>
                    </View>                    
                    <Pressable>
                        <IconButton icon='dots-vertical' />
                    </Pressable>
                </TouchableOpacity>
            </Card>            
        </View>
    )
}