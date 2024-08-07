import axios, { AxiosResponse } from 'axios'
import { api, basePost } from './api'

export interface ILogin {
    username: string
    password: string
}
export interface ILoginResponse{
    ok: Boolean
    detail: string | null
    refresh: string | null
    access: string | null
    status: string | null
}
export const RequestLogin = async (request : ILogin ) : Promise<ILoginResponse> => {
    try {
        const loginUri = `token/`;        
        const response: AxiosResponse<ILoginResponse> = await basePost({ url: loginUri, data: request });
        const userData: ILoginResponse = {...response.data, ok: !response.data.detail }
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.access}`;//;
        return userData
    } catch (error) {
        let errorMessage = '';
        if(axios.isAxiosError(error)){
            let errorData: ILoginResponse = error.response?.data;
            errorMessage = (errorData.detail || '' );
        }else 
            errorMessage = 'Credentials Error';
        let r: ILoginResponse = {
            detail: errorMessage,
            ok: false,
            refresh: null,
            access: null,
            status: null
        }
        return r;
    }
}