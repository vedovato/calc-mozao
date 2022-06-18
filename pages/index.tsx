import { Button } from 'antd';
import type { NextPage } from 'next';
import Head from 'next/head';

import { signInWithGoogle } from '../firebase/clientApp';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Precificador do Mozão</title>
      <meta name="description" content="Só mais um feriado produtivo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Precificador do Mozão
      </h1>

      <p className={styles.description}>
        Clique no botão para iniciar
      </p>

      <Button size='large' type="primary" onClick={signInWithGoogle}>Começar</Button>
    </main>

  </>
)

export default Home
