import type { Metadata } from "next";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section>
        <Sidebar />
        <div className="main">
          <Navbar />
          {children}
        </div>
      </section>
    </>
  )
}
