'use client'

import { useAppSelector } from "@/lib/hooks";
import { isTokenExpired, validateToken } from "@/utils/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";


export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth);
    const { isAuthenticated, token, user } = auth;
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
