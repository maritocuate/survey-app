import type { NextPage } from 'next'
import styles from './styles.module.scss'
import { useAuth } from '../../context/SurveyContext'

const Header: NextPage = () => {
  const { userAccount } = useAuth()

  return (
    <div className={styles.header}>
      <h1>Survey App</h1>
      <p>{ userAccount }</p>
    </div>
  )
}

export default Header
