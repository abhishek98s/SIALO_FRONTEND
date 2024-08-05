import { useAppSelector } from "@/lib/hooks";
import { validateToken } from "@/utils/auth";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);



    useEffect(() => {
        if (!user || !user.token) {
            router.push('/login')
            return
        }

        const isTokenValid = validateToken(user.token);


    }, [])

    return (
        <>
            {isAuthenticated && children}
        </>
    )
}

