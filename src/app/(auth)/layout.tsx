'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toaster } from "react-hot-toast"

import { useAppSelector } from "@/lib/hooks";
import { getLocalStorageItem } from "@/utils/storage";
import { toast_error_option, toast_sucess_option } from "@/utils/toast"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const token = getLocalStorageItem('ACCESS_TOKEN');
  const { isAuthenticated } = user;

  useEffect(() => {
    if (token || isAuthenticated) {
      router.push('/')
    }
  }, [])

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
