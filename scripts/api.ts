import axios from 'axios';
type BaseFetch = {
    url: string,
  }
  
  type BasePost = {
    url: string,
    data: Object
  }
  
  export const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/`
  });
  
  export const baseFetch = ({ url }: BaseFetch) => api.get(url);
  export const basePost = ({ url, data }: BasePost) => api.post(url, data);