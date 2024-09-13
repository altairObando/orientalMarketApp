import React from 'react';
import { TouchableOpacity, Image, View, Pressable, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

interface ProductItemProps {
    imageUrl : string;
    productTitle: string;
    productPrice: string;
    productOther: string
}

export const ProductItem: React.FC<ProductItemProps> = (props) => (
    <Card style={{ flex: 1 }}>
        <TouchableOpacity style={styles.itemContainer}>
            <Image
                source={{ uri: props.imageUrl }}
                style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <View style={ styles.titleContainer }>
                    <Text style={{ flex: 1, width: 1 }}>{ props.productTitle }</Text>
                </View>
                <View style={ styles.pricingText }>
                    <Text>{ props.productPrice }</Text>
                    <Text>{ props.productOther }</Text>
                </View>
            </View>
            <Pressable>
                <IconButton icon='dots-vertical' />
            </Pressable>
        </TouchableOpacity>
    </Card>
)

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    imageStyle: { width: 100, height: 100, alignSelf: 'flex-start', resizeMode: 'stretch' },
    textContainer: { padding: 10, flex: 1, flexDirection: 'column', justifyContent: 'space-between', gap: 10 },
    titleContainer: { flex: 1, flexGrow: 1, flexDirection: 'row' },
    pricingText: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-around',
        backgroundColor: 'cyan',
        alignItems: 'center'
    }
})