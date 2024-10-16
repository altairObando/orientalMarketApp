import { Product } from '@/interfaces/Product';
import { baseFetch } from '@/scripts/api';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ProductItem } from './ProductItem';
export const ProductList:React.FC =()=>{
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading ] = useState(false);
    const loadProducts =()=>{
        setLoading(true);
        baseFetch({url: '/product/' }).then(response => {
            let prodResponse : AxiosResponse<Product[]> = response;
            if(prodResponse.status == 200)
                setProducts(prodResponse.data);
        }).catch(err => {
            if(err instanceof AxiosError ){
                console.log(err.response)
            }
        }).finally(()=> setLoading(false))
    }
    useEffect(loadProducts,[]);
    return <FlatList
        data={ products }
        keyExtractor={ pro => pro.id.toString() }
        renderItem={ ({ item }) => <ProductItem 
            productTitle={ item.name }
            productLeft={ item.code }
            productRigth={ item.id.toString() } />
        }
        contentContainerStyle={{ gap: 5 }}
        refreshControl={ <RefreshControl refreshing={ loading } onRefresh={ loadProducts }/>}
        />
}