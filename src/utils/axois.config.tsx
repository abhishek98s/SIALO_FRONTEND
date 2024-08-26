import axios, { AxiosInstance } from 'axios';
import { getLocalStorageItem } from './storage';

export const axiosInterceptor = (): AxiosInstance => {
    const token = getLocalStorageItem('jwtToken');
    console.log(token)

    if (!token) {
        throw new Error('No token found in local storage');
    }

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use((config) => {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return axiosInstance;
};



