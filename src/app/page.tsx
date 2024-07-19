import { Metadata } from "next";
import IndexPage from "./(main)/home/home";
import MainLayout from "./(main)/layout";

export const metadata: Metadata = {
  title: 'Sialo | Connect with the World and Share Your Story',
}

export default function Home() {

  return (
    <>
      <IndexPage />
    </>
  );
}
