import React from 'react'
import { ProductItem } from '@/components/Product/ProductItem';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';

export default function Index(){
    const { id = 0 } = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={{ display: 'flex', flex: 1, padding: 5, gap: 10 }}>
            <Searchbar
             placeholder='Search your product'
             onChangeText={setSearchQuery}
             value={searchQuery}/>
            <>
            <ProductItem
                imageUrl='https://m.media-amazon.com/images/I/61Bue23QpZL._AC_SX466_.jpg'
                productRigth='000015242-F'
                productLeft={ `C$ ${Number(1234567).toLocaleString('en-us')}`}
                productTitle='Product Name'/>
            <ProductItem
                imageUrl='https://m.media-amazon.com/images/I/61Bue23QpZL._AC_SX466_.jpg'
                productRigth='000015242-F'
                productLeft={ `C$ ${Number(1234567).toLocaleString('en-us')}`}
                productTitle='Product Name'/>
            <ProductItem
                imageUrl='https://m.media-amazon.com/images/I/61Bue23QpZL._AC_SX466_.jpg'
                productRigth='000015242-F'
                productLeft={ `C$ ${Number(1234567).toLocaleString('en-us')}`}
                productTitle='Product Name'/>
            <ProductItem
                imageUrl='https://m.media-amazon.com/images/I/61Bue23QpZL._AC_SX466_.jpg'
                productRigth='000015242-F'
                productLeft={ `C$ ${Number(1234567).toLocaleString('en-us')}`}
                productTitle='Product Name'/>
            </>
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