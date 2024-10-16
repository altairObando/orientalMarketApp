import React from 'react'
import { ProductItem } from '@/components/Product/ProductItem';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { ProductList } from '@/components/Product/ProductList';

export default function Index(){
    const { id = 0 } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={{ display: 'flex', flex: 1, padding: 5, gap: 10 }}>
            <Searchbar
             placeholder='Search your product'
             onChangeText={setSearchQuery}
             value={searchQuery}/>
            <ProductList />
            <Link href='/Products/0' asChild>
                <FAB
                    icon='plus'
                    style={ styles.fab }
                    />
            </Link>
        </View>
    )
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})