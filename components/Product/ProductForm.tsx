import { Product } from '@/interfaces/Product';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import CurrencyPicker from '../Util/CurrencyPicker';

interface ProductFormProps {
    Product?: Product
}

const ProductForm:React.FC<ProductFormProps>=({ Product })=>{
    const [ tags, setTags ] = useState<Array<String>>(['new','old','test']);
    const [ newTag, setNewTag ] = useState<string>('');
    const inputRef = useRef<any>(null);
    const onTagPress =(tag: String)=>{
        setTags( current => current.filter( items => items != tag));
    }
    useEffect(()=>{
        const productTags: [String] = JSON.parse(Product?.tags?? '[]');
        setTags(productTags);
    },[Product]);
    const onTagChange=(newTag: string )=>{
        let clearValue = newTag.trim();
        if(clearValue.includes(',')){
            const [ tag ] = clearValue.split(',');
            if(tag) setTags(current => ([...current, tag ]));
            setNewTag('');
        }else{
            setNewTag(newTag);
        }
    }    
    return (
        <View style={ style.formContainer }>
            <TextInput label='Code' mode='outlined' />
            <TextInput label='Name' mode='outlined' />
            <TextInput label='Description' mode='outlined'/>
            <TextInput 
                label='Tags'
                mode='outlined'
                onChangeText={ newValue => onTagChange(newValue) }
                value={ newTag }
                autoFocus={ true }
                ref={ inputRef }/>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10}}>
                {
                    tags.map( tag => <Chip 
                        mode='outlined'
                        key={Math.random()}
                        icon='heart'
                        onPress={ () => onTagPress(tag) }>{ tag }</Chip>  )
                }
            </View>
            <CurrencyPicker />
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