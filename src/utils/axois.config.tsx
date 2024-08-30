import axios, { AxiosInstance } from 'axios';
import { clearLocalStorage, getLocalStorageItem, setLocalStorage } from './storage';
import { APP_BASE_URL } from './app';

export const axiosInterceptor = (): AxiosInstance => {
    const token = getLocalStorageItem('ACCESS_TOKEN');

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use((config) => {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });


    axiosInstance.interceptors.response.use(
        (response) => {

            return response;
        },
        async (error) => {
            if (401 === error?.response?.status) {
                error.config._retry = true;
                console.log("errrrr")
                try {
                    const localRefreshToken = getLocalStorageItem('REFRESH_TOKEN');
                    const axiosInstance = axiosInterceptor();
                    const response = await axiosInstance.post(`${APP_BASE_URL}/auth/refresh`, { refreshToken: localRefreshToken });

                    const { status, data } = response.data;

                    if (!status) throw new Error();

                    const { accessToken, refreshToken } = data;

                    setLocalStorage('ACCESS_TOKEN', accessToken);
                    setLocalStorage('REFRESH_TOKEN', refreshToken);

                    error.config.headers['X-XSRF-TOKEN'] = accessToken;

                    return axiosInstance.request(error.config);
                } catch (err) {
                    clearLocalStorage();
                    return Promise.reject(err);
                }
            }
            if (404 === error?.response?.status) {
                // do something
            }
            if (500 === error?.response?.status) {
                // do something
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
