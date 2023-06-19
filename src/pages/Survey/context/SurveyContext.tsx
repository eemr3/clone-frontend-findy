import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { Survey } from "../../../types/Survey";

type SurveyProviderProps = {
  children: ReactNode;
}

type SurveyContextProps = {
  survey: Survey;
  setSurvey: Dispatch<SetStateAction<Survey>>;
  //initializeSurvey: () => void;
}

export const SurveyContext = createContext({} as SurveyContextProps);

export function SurveyProvider({ children }: SurveyProviderProps) {
  const [survey, setSurvey] = useState<Survey>({} as Survey);

  return (
    <SurveyContext.Provider
      value={{
        survey,
        setSurvey
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export const useSurveyContext = () => useContext(SurveyContext);