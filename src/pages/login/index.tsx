import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import styles from './styles.module.scss'
import { useSurvey } from '../../context/SurveyContext'
import { ethers } from 'ethers'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window { ethereum: any }
}
interface IButton {
  type: string,
  target: string
}

const Login: NextPage = () => {
  const [haveMetamask, setHavemetamask] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Connect')
  const [buttonLink, setButtonLink] = useState<IButton>({ type: '', target: '' })

  const ropstenChainId:string = '3'
  const router = useRouter()
  const { userAccount, saveAccount, saveBalance } = useSurvey()

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHavemetamask(true)

      if (!userAccount) {
        setButtonText('Connect with Metamask')
        setButtonLink({
          type: 'request',
          target: 'eth_requestAccounts'
        })
      } else if (window.ethereum.networkVersion !== ropstenChainId) {
        setButtonText('Switch to Ropsten')
        setButtonLink({
          type: 'switch',
          target: 'wallet_switchEthereumChain'
        })
      } else {
        getBalance(userAccount)
        router.push('/survey')
      }
    }
  }, [userAccount])

  const handleClick = (type:string, target?:string) => {
    if (type === 'request') {
      window.ethereum.request({ method: target })
        .then((res: string[]) => {
          saveAccount(res[0])
        })
    } else if (type === 'switch') {
      window.ethereum.request({
        method: target,
        params: [{ chainId: '0x' + ropstenChainId.toString() }]
      })
        .then(() => {
          getBalance(userAccount)
          router.push('/survey')
        })
    }
  }

  const getBalance = async (address:string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const balance = await provider.getBalance(address)
    const balanceInEth = ethers.utils.formatEther(balance)
    saveBalance(balanceInEth)
  }

  return (
    <div className={styles.container}>
      {
        !haveMetamask
          ? (
          <a
            href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
          >Please, install Metamask plugin</a>
            )
          : (
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
