import type { Metadata } from "next";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section>
        <Sidebar />
        <div className="main pt-[70px]">
          <Navbar />
          {children}
        </div>
      </section>
    </>
  )
}
