'use client';

import { Inter, Quicksand } from "next/font/google";
import "./globals.scss";

import Providers from "@/lib/store.provider";
import { PersistGate } from 'redux-persist/integration/react'

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
            {children}
          </Providers>
        </body>
      </html>
    </>
  )
}
