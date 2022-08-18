import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Connect from './Connect'
import styles from './styles.module.scss'

const Dashboard: NextPage = () => {
  const [haveMetamask, sethaveMetamask] = useState(true)

  useEffect(() => {
		const { ethereum } = window

		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false)
			}else {
        sethaveMetamask(true)
      }
		}
		checkMetamaskAvailability()
	}, [])
  
  return (
    <div className={styles.container}>
      {
        !haveMetamask ? (
          <Connect />
        ) : (
          <p>MataMask OK</p>
				)
      }
    </div>
  )
}

export default Dashboard
