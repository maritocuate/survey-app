import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'antd';
import styles from './styles.module.scss'
import { useAuth } from '../../context/SurveyContext'
import { useRouter } from 'next/router'

declare global {
  interface Window { ethereum: any }
}
interface IButton {
  type: string,
  target: string
}

const Login: NextPage = () => {
  const [haveMetamask, setHavemetamask] = useState(false)
  const [buttonText, setButtonText] = useState('Connect')
  const [buttonLink, setButtonLink] = useState<IButton>({type:'', target:''})
  const [account, setAccount] = useState(null)

  const ropstenChainId:string = '3'
  const router = useRouter()
  const { userAccount, saveAccount } = useAuth()

  useEffect(() => {

    setAccount(userAccount)
    if (typeof window.ethereum !== 'undefined') {
      setHavemetamask(true)

      if(!userAccount) {
        setButtonText('Connect with Metamask')
        setButtonLink({
          type: 'request', 
          target: 'eth_requestAccounts'
        })

      }else if(window.ethereum.networkVersion !== ropstenChainId) {
        setButtonText('Switch to Ropsten')
        setButtonLink({
          type: 'switch', 
          target: 'wallet_switchEthereumChain'
        })

      }else {
        router.push('/survey')
      }
    }
  }, [userAccount])

  const handleClick = (type:string, target?:string) => {
    
    if(type==='request') {
      window.ethereum.request({method: target})
      .then(res => {
        saveAccount(res[0])
      })

    }else if(type==='switch') {
      window.ethereum.request({
        method: target,
        params: [{ chainId: '0x'+ropstenChainId.toString(16) }]
      })
      .then(() => {
        router.push('/survey')
      })
    }
  }

  return (
    <div className={styles.container}>
      {
        !haveMetamask ? (
          <a 
            href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
          >Please, install Metamask plugin</a>
        ) : (
          <Button
            type='primary'
            onClick={() => handleClick(buttonLink.type, buttonLink.target)}
          >{ buttonText }</Button>
        )
      }
    </div>
  )
}

export default Login
