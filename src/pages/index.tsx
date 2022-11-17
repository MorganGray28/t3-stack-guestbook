import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading) {
    return (
      <p>Loading Messages...</p>
    )
  }

  return (
    <div>
      {messages?.map((msg, ind) => {
        return (
          <div key={ind}>
            <p>{msg.message} - <span>{msg.name}</span></p>
          </div>
        )
      })}
    </div>
  )
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.header}>Guestbook</h1>
        <p className={styles.subheader}>
        Tutorial for <code>create-t3-app</code>
        </p>
        <div className={styles.session}>
          {session ? (
            <>
              <p>Hi {session.user?.name}</p>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
          <button onClick={() => signIn('discord')}>Login With Discord</button>         
          )
          }
          <Messages />
          </div>
      </main>
    </>
  );
};

export default Home;