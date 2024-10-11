import { Product } from '@/interfaces/Product';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';
import CurrencyPicker from '../Util/CurrencyPicker';
import { basePost, basePut } from '@/scripts/api';
import { AxiosError } from 'axios';
import { useUserData } from '@/data/UserStore';

interface ProductFormProps {
    Product?: Product
}

const ProductForm:React.FC<ProductFormProps>=({ Product })=>{
    const [ tags, setTags ] = useState<Array<String>>(['new','old','test']);
    const storeId = useUserData( userData => userData.selectedStoreId);
    const [ newTag, setNewTag ] = useState<string>('');
    const [ formValues, setFormValues] = useState<Product>();
    const onTagPress =(tag: String)=>{
        setTags( current => current.filter( items => items != tag));
    }
    useEffect(()=>{
        const productTags: [String] = JSON.parse(Product?.tags?? '[]');
        setTags(productTags);
        setFormValues({...Product, store: storeId } as Product);
    },[Product]);
    const onTagChange=(newTag: string )=>{
        let clearValue = newTag.trim();
        if(clearValue.includes(',')){
            const [ tag ] = clearValue.split(',');
            if(tag){
                let newTags = [...tags, tag ];
                setTags(newTags);
                setFormValues(current =>({...current, tags: JSON.stringify(newTags)}) as Product);
            }
            setNewTag('');
        }else{
            setNewTag(newTag);
        }
    }
    const onProductSave=()=>{
        let isNewProduct = (Product?.id ?? 0) == 0; 
        let saveAction=  isNewProduct? basePost : basePut;
        saveAction({ url: `/product/${ !isNewProduct ? Product?.id ?? 0 : '' }`, data: formValues ?? {} }).then(response => {
            console.log(response);
        }).catch(err => {
            if (err instanceof AxiosError){
                console.log(err.message)
                console.log(err.response?.data)
            }
        })
    }
    const onInputChange=( propName: string, value: any )=> setFormValues(current => ({...current, [propName]: value }) as Product)
    return (
        <View style={ style.formContainer }>
            <TextInput 
                label='Code'
                mode='outlined'
                value={formValues?.code ?? ''}
                onChangeText={value => onInputChange('code', value)}/>
            <TextInput 
                label='Name'
                mode='outlined'
                value={formValues?.name ?? ''}
                onChangeText={value => onInputChange('name', value)}/>
            <TextInput 
                label='Description'
                mode='outlined'
                value={formValues?.description ?? ''}
                onChangeText={value => onInputChange('description', value)}/>
            <CurrencyPicker
                value={ (formValues?.currency?? 0).toString() }
                onChange={(newValue) => setFormValues(current => ({...current,currency: Number(newValue)}) as Product  ) }/>
            <TextInput 
                label='Tags'
                mode='outlined'
                onChangeText={ newValue => onTagChange(newValue) }
                value={ newTag }
                autoFocus={ true }
                />
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
                {
                    tags.map( tag => <Chip 
                        mode='outlined'
                        key={Math.random()}
                        icon='heart'
                        onPress={ () => onTagPress(tag) }>{ tag }</Chip>  )
                }
            </View>
            <Button mode='contained' onPress={onProductSave}> Save </Button>
        </View>
    )
}

const style= StyleSheet.create({
    formContainer: {
        display:'flex',
        padding: 5,
        gap: 10,
    }
})

export default ProductForm;