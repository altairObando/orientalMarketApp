import { Store } from '@/interfaces/Store';
import { basePost } from './api';
import { AxiosResponse } from 'axios';

export const createNewStore=async( userData: Store ): Promise<Store> =>{
    const response: AxiosResponse<Store> = await basePost({ url: 'store/', data: userData });
    return response.data;
}