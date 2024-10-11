import React from 'react';
import { TouchableOpacity, Image, View, Pressable, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

interface ProductItemProps {
    imageUrl : string;
    productTitle: string;
    productLeft: string;
    productRigth: string
}

export const ProductItem: React.FC<ProductItemProps> = (props) => (
    <Card>
        <TouchableOpacity style={styles.itemContainer}>
            <Image
                source={{ uri: props.imageUrl }}
                style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <View style={ styles.titleContainer }>
                    <Text>{ props.productTitle }</Text>
                </View>
                <View style={ styles.pricingText }>
                    <Text>{ props.productLeft }</Text>
                    <Text>{ props.productRigth }</Text>
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
        flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'
    },
    imageStyle: { 
        width: 100,
        height: 100,
        alignSelf: 'flex-start',
        resizeMode: 'stretch',
        margin:10,
        borderRadius: 10
    },
    textContainer: { padding: 10, flex: 1, flexDirection: 'column', justifyContent:'space-between', gap: 10 },
    titleContainer: { flex: 2, justifyContent:'center', alignContent:'center' },
    pricingText: {
        flex: 1,
        gap: 15,
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})