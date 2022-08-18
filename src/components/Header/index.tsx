import type { NextPage } from 'next'
import styles from './styles.module.scss'

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <h1>Survey App</h1>
    </div>
  )
}

export default Header
