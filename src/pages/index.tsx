import type { NextPage } from 'next'
import { Layout } from 'antd'
import Head from 'next/head'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import { Content } from 'antd/lib/layout/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Survey App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Header />
        <Dashboard />
      </Content>
    </Layout>
  )
}

export default Home
