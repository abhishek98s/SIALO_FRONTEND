'use client'

import { useAppSelector } from "@/lib/hooks";
import { getLocalStorageItem } from "@/utils/storage";
import { useRouter } from "next/navigation"
import React, { useEffect } from "react";


export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth);
    const token = getLocalStorageItem('ACCESS_TOKEN');
    const { isAuthenticated } = auth;

    useEffect(() => {
        const runInitialy = () => {
            if (!token || !isAuthenticated) {
                router.push('/login')
            }
        }
        runInitialy()
    }, [])

    return (
        <>
            {isAuthenticated && children}
        </>
    )
}
