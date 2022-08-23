import { createContext, useContext, ReactNode, useState } from "react"

type IContextType = {
    userAccount: string
    saveAccount: () => void
    balance: string
    saveBalance: () => void
};

const surveyContextDefaultValues: IContextType = {
    userAccount: '',
    saveAccount: () => {},
    balance: '',
    saveBalance: () => {}
};

const SurveyContext = createContext<IContextType>(surveyContextDefaultValues)

export function useSurvey() {
    return useContext(SurveyContext)
}

type Props = {
    children: ReactNode
}

export function SurveyProvider({ children }: Props) {
    const [userAccount, setUserAccount] = useState<string>('')
    const [balance, setBalance] = useState<string>('')

    const saveAccount = (id:string) => {
        setUserAccount(id)
    }
    const saveBalance = (amount:string) => {
        setBalance(amount)
    }

    const value = {
        userAccount,
        saveAccount,
        balance,
        saveBalance
    }

    return (
        <>
            <SurveyContext.Provider value={value}>
                {children}
            </SurveyContext.Provider>
        </>
    );
}