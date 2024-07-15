import { Metadata } from "next";
import IndexPage from "./home/home";

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
