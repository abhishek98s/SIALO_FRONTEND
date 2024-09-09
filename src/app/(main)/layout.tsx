
import React from 'react';

import 'react-responsive-modal/styles.css';

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthComponent } from "@/components/auth_component";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthComponent>
        <section>
          <Sidebar />
          <div className="main pt-[70px] pb-[90px] lg:pb-[20px]">
            <Navbar />

            <div className="px-[4px]">
              {children}
            </div>
          </div>
        </section>
      </AuthComponent>
    </>
  )
}
