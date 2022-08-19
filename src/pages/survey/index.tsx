import type { NextPage } from 'next'
import { Content } from 'antd/lib/layout/layout'
import styles from './styles.module.scss'
import Header from '../../components/Header';
import Dashboard from '../../components/Dashboard';


const Survey: NextPage = () => {  
  return (
    <Content>
      <Header />
      <Dashboard />
    </Content>
  )
}

export default Survey
