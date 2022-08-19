import type { NextPage } from 'next'
import { Layout } from 'antd'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Survey App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  )
}

export default Home
