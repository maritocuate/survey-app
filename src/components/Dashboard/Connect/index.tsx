import type { NextPage } from 'next'
import { Button } from 'antd';
import styles from './styles.module.scss'
import Link from 'next/link';


const Connect: NextPage = () => {  
  return (
    <div className={styles.container}>
      {
          <Link href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>
            <Button
              type='link'
              danger
            >Please install MataMask browser extension.</Button>
          </Link>
				
      }
    </div>
  )
}

export default Connect
