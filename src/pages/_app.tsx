import 'antd/dist/antd.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SurveyProvider } from '../context/SurveyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SurveyProvider>
      <Component {...pageProps} />
    </SurveyProvider>
  )
}

export default MyApp
