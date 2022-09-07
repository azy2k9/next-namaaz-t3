import type { NextPage } from 'next';
import Head from 'next/head';
import moment from 'moment';

const Home: NextPage = () => {
  const date = moment().format('hh:mm');
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
        <section className="flex flex-col justify-center items-center flex-1 bg-green-600 text-white font-semibold text-9xl">
          <span className="text-5xl pb-2">Maghrib</span>
          <span>{date}</span>
        </section>
        <section className="flex flex-col justify-center items-center flex-1 bg-green-800 text-white font-semibold text-9xl">
          <span className="text-5xl pb-2">Isha</span>
          <span>{date}</span>
        </section>
      </main>
    </>
  );
};

export default Home;
