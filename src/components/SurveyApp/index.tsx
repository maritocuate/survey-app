import type { NextPage } from 'next'
import { useState } from 'react'
import { Button, Card } from 'antd'
import * as Survey from 'survey-react'
import 'survey-react/survey.css'

interface Props {
    data: any
}

const SurveyApp: NextPage<Props> = ({ data }:{data:object}) => {
  const [results, setResults] = useState(null)

  const model = new Survey.Model(data)

  const completedSurvey = (result:any) => {
    setResults(result.valuesHash)
  }

  return (
        <>
        {
            !results
              ? (
                <Survey.Survey
                    model={ model }
                    showCompletedPage={ false }
                    onComplete={ completedSurvey }
                />
                )
              : (
                <Card size="small" title="Results" style={{ width: 600 }}>
                    <pre>{JSON.stringify(results, null, 5)}</pre>
                    <Button type="primary">Send results</Button>
                </Card>
                )
        }
        </>
  )
}

export default SurveyApp
