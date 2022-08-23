import { createContext, useContext, ReactNode, useState } from 'react'

type IContextType = {
    userAccount: string
    saveAccount: (id:string) => void
    balance: string
    saveBalance: (amount:string) => void
};

const surveyContextDefaultValues: IContextType = {
  userAccount: '',
  saveAccount: () => {},
  balance: '',
  saveBalance: () => {}
}

const SurveyContext = createContext<IContextType>(surveyContextDefaultValues)

export function useSurvey () {
  return useContext(SurveyContext)
}

type Props = {
    children: ReactNode
}

export function SurveyProvider ({ children }: Props) {
  const [userAccount, setUserAccount] = useState<string>('')
  const [balance, setBalance] = useState<string>('')

  const saveAccount = (id:string) => {
    setUserAccount(id)
  }
  const saveBalance = (amount:string) => {
    setBalance(amount)
  }

  const contextValue:any = {
    userAccount,
    saveAccount,
    balance,
    saveBalance
  }

  return (
        <>
            <SurveyContext.Provider value={contextValue}>
                {children}
            </SurveyContext.Provider>
        </>
  )
}
