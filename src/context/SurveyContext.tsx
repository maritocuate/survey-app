import { createContext, useContext, ReactNode, useState } from "react"

type IContextType = {
    userAccount: string
    saveAccount: () => void
};

const surveyContextDefaultValues: IContextType = {
    userAccount: '',
    saveAccount: () => {}
};

const SurveyContext = createContext<IContextType>(surveyContextDefaultValues)

export function useAuth() {
    return useContext(SurveyContext)
}

type Props = {
    children: ReactNode
}

export function SurveyProvider({ children }: Props) {
    const [userAccount, setUserAccount] = useState<string>('')

    const saveAccount = (id:string) => {
        setUserAccount(id)
    }

    const value = {
        userAccount,
        saveAccount
    }

    return (
        <>
            <SurveyContext.Provider value={value}>
                {children}
            </SurveyContext.Provider>
        </>
    );
}