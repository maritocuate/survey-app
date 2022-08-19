import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Content } from 'antd/lib/layout/layout'
import styles from './styles.module.scss'
import Header from '../../components/Header'
import Dashboard from '../../components/Dashboard'
import { useAuth } from '../../context/SurveyContext'

const Survey: NextPage = () => {  

  const { userAccount } = useAuth()
  const router = useRouter()

  useEffect(() => { 
    !userAccount ? router.push('/login') : null
  }, [userAccount])

  return (
    <Content>
      <div className={styles.container}>
        <Header />
        <Dashboard />
      </div>
    </Content>
  )
}

export default Survey
