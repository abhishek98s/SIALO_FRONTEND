import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';

const useToken = () => {
    // Use the useAppSelector hook to access the token from the Redux store
    const token = useAppSelector((state) => state.auth.token);
    return token;
};

const AxiosInterceptor = () => {
    const token = useToken();

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return axiosInstance;
};

export default AxiosInterceptor;
