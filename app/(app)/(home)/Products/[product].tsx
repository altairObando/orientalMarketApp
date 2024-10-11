import { View } from 'react-native';
import { Text } from 'react-native-paper';
import  { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react';
import { Product } from '@/interfaces/Product';
import ProductForm from '@/components/Product/ProductForm';
export default function ProductsForm(){
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const [ product, setProduct ] = useState<Product>();
    useEffect(()=>{
        navigation.setOptions({
          headerRight: ()=> <Text>  </Text>,
          headerTitle: ()=> params.id == '0' ? 'New Product': product?.name ?? '',
        })
      },[navigation]);

      useEffect(()=>{
        if(!params.id){
            setProduct({} as Product);
            return;
        }else {
            /// TODO: Fetch product by id
        }

      },[ params.id ])
    return <View>
        <ProductForm Product={ product }/>
    </View>
}