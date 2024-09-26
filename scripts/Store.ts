import { Store } from '@/interfaces/Store';
import { basePost, basePut } from './api';
import { AxiosResponse } from 'axios';

export const createNewStore=async( userData: Store ): Promise<Store> =>{
    const response: AxiosResponse<Store> = await basePost({ url: 'store/', data: userData });
    return response.data;
}
export const updateStore=async( userData: Store): Promise<Store> => {
    const response: AxiosResponse<Store> = await basePut({ url: `store/${ userData.id }`, data: userData });
    return response.data;
}