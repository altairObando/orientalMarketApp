import { Currency } from '@/interfaces/Currency';
import { baseFetch } from '@/scripts/api';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItemProps, Option } from 'react-native-paper-dropdown';

interface CurrencyPickerProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (newValue: string) => void;
    mode?: 'flat' | 'outlined';
}

const CurrencyPicker:React.FC<CurrencyPickerProps>=(props)=>{
    const [ selectedValue, setValue ] = useState<string|undefined>();
    const [ options, setOptions ] = useState<Option[]>();
    useEffect(()=>{
        baseFetch({ url: '/currency/'}).then(response => {
            let result: AxiosResponse<Currency[] | undefined> = response;
            if(result.status == 200){
                setOptions( (result.data??[]).map( c => ({ value: c.id.toString(), label: c.name } as Option )))
            }
        })
    },[]);
    useEffect(()=>{
        setValue(props.value)
    }, [props.value])
    return <Dropdown
    label={props.label?? 'Currency'}
    placeholder={props?.label??'Select your currency'}
    value={ selectedValue }
    onSelect={ setValue }
    mode={ props.mode ?? 'outlined'}
    options={ options ?? [] } />
}

export default CurrencyPicker