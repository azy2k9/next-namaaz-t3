import type { NextPage } from 'next';
import Head from 'next/head';
import useNamaaz from '../hooks/useNamaaz';

const Home: NextPage = () => {
  const { current, next } = useNamaaz();

  return (
    <>
      <Head>
        <title>Next Namaaz</title>
        <meta
          name="description"
          content="Namaaz times for North Manchester Jamia Mosque"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col min-h-screen min-w-full">
        <section className="flex flex-col justify-center items-center flex-1 bg-green-600 text-white font-semibold text-9xl text-center">
          <span className="text-5xl pb-2">{current.name}</span>
          <span>{current.time.format('hh:mm a')}</span>
        </section>
        <section className="flex flex-col justify-center items-center flex-1 bg-green-800 text-white font-semibold text-9xl text-center">
          <span className="text-5xl pb-2">{next.name}</span>
          <span>{next.time.format('hh:mm a')}</span>
        </section>
      </main>
    </>
  );
};

export default Home;
