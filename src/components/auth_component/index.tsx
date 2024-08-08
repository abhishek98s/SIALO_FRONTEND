'use client'

import { useAppSelector } from "@/lib/hooks";
import { isTokenExpired, validateToken } from "@/utils/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth);
    const { isAuthenticated, token } = user;
    const [isloaded, setisLoaded] = useState(false);

    useEffect(() => {
        const runInitialy = () => {

            if (!user || !token) {
                router.push('/login')
                return
            }

            if (isTokenExpired(token)) {
                router.push('/login')
            };

            router.push('/')
            setisLoaded(true);
        }
        runInitialy()
    }, [])

    return (
        <>
            {isAuthenticated && children}
        </>
    )
}
