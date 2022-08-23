import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import styles from './styles.module.scss'
import { useSurvey } from '../../context/SurveyContext'
import SurveyApp from '../SurveyApp'

const { Text } = Typography

const Dashboard: NextPage = () => {
  const [data, setData] = useState(null)
  const [survey, setSurvey] = useState(false)

  const { balance } = useSurvey()

  useEffect(() => {
    fetch('/api/survey')
    .then(res => res.json())
    .then(res => setData(res))
  }, [])


  return (
    <div className={styles.dashboard}>
      {
        !survey ? (
          <div className={styles.dashboard__start}>
            <Button
              type='dashed'
              onClick={ () => setSurvey(true) }
            >Start Survey</Button>
            <Text type='success'>Balance: { balance }</Text>
          </div>
        ) : (
          <SurveyApp data={ data } />
        )
      }
    </div>
  )
}

export default Dashboard
