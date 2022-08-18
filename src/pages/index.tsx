import type { NextPage } from 'next'
import { Layout } from 'antd'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Survey App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </Layout>
  )
}

export default Home
