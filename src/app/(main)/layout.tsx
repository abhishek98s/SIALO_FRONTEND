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
        <div className="main pt-[70px] pb-[90px] lg:pb-[20px]">
          <Navbar />

          <div className="pl-[230px] px-[4px]">
            <div className="max-w-[910px] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
