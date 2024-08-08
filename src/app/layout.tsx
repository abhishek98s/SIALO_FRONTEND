'use client';

import { Inter, Quicksand } from "next/font/google";
import "./globals.scss";

import dynamic from 'next/dynamic';
import { AuthComponent } from "@/components/auth_component";
const Providers = dynamic(() => import('@/lib/store.provider'), { ssr: false });



const quickSand = Quicksand({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html className={quickSand.className}>
        <body>
          <Providers>
            <AuthComponent>
              {children}
            </AuthComponent>
          </Providers>
        </body>
      </html>
    </>
  )
}
