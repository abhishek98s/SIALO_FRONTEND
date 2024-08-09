'use client';

import { useAppSelector } from "@/lib/hooks";
import { toast_error_option, toast_sucess_option } from "@/utils/toast"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const { isAuthenticated, token } = user;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  })
  return (
    <>
      {!isAuthenticated &&

        <>
          {children}
          < Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              success: { ...toast_sucess_option },
              error: { ...toast_error_option },
            }} />
        </>

      }
    </>
  )
}
