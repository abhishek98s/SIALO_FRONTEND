import Navbar from "@/components/navbar";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Sialo | Connect with the World and Share Your Story',
}

export default function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}
