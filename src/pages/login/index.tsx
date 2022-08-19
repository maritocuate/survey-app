import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Button } from 'antd';
import styles from './styles.module.scss'

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

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHavemetamask(true)

      if(!account) {
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
        window.open('/survey', '_self')
      }
    }
  }, [account])

  const handleClick = (type:string, target?:string) => {
    if(type==='request') {
      window.ethereum.request({method: target})
      .then(res => {
        setAccount(res[0])
      })

    }else if(type==='switch') {
      window.ethereum.request({
        method: target,
        params: [{ chainId: '0x'+ropstenChainId.toString(16) }]
      })
      .then(() => {
        window.open('/survey', '_self')
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
