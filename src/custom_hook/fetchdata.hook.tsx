import { useCallback, useEffect, useState } from "react"
import { axiosInterceptor } from "@/utils/axois.config";

const useFetchData = (url: string, dependencies?: any) => {
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.get(url);

            const { status, data } = response.data;

            if (!status) throw new Error();

            setData(data);

        } catch (error) {
            setError(error as Error);
        } finally {
            setTimeout(() => setLoading(false), 2000)
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [dependencies, fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, loading, refetch };
}

export default useFetchData;
