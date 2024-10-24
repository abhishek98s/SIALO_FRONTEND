import { Metadata } from "next";
import IndexPage from "./(main)/home/home";
import MainLayout from "./(main)/layout";
import Head from "next/head";

export const metadata: Metadata = {
  title: 'Sialo | Connect with the World and Share Your Story',
}

export default function Home() {

  return (
    <>
      <Head>
        <link rel="preload" as="style" href="/_next/static/css/app/layout.css?1721390888758" />
      </Head>
      <IndexPage />
    </>
  );
}
