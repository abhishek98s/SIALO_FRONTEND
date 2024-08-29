import { useEffect, useState } from "react"
import { axiosInterceptor } from "@/utils/axois.config";

const useFetchData = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
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
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, loading };
}

export default useFetchData;
