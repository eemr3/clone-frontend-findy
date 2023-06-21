import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { Survey } from "../../../types/Survey";
import { SurveyMarketData } from "../../../types/SurveyMarketData";

type SurveyProviderProps = {
  children: ReactNode;
}

type SurveyContextProps = {
  survey: Survey;
  setSurvey: Dispatch<SetStateAction<Survey>>;
  surveyMarketData: SurveyMarketData;
  setSurveyMarketData: Dispatch<SetStateAction<SurveyMarketData>>;
  surveyProfissionalArea: SurveyProfissionalArea;
  setSurveyProfissionalArea: Dispatch<SetStateAction<SurveyProfissionalArea>>;
  //initializeSurvey: () => void;
}

export const SurveyContext = createContext({} as SurveyContextProps);

export function SurveyProvider({ children }: SurveyProviderProps) {
  const [survey, setSurvey] = useState<Survey>({} as Survey);
  const [surveyMarketData, setSurveyMarketData] = useState<SurveyMarketData>({} as SurveyMarketData);
  const [surveyProfissionalArea, setSurveyProfissionalArea] = useState<SurveyProfissionalArea>({} as SurveyProfissionalArea);

  return (
    <SurveyContext.Provider
      value={{
        survey,
        setSurvey,
        surveyMarketData,
        setSurveyMarketData,
        surveyProfissionalArea,
        setSurveyProfissionalArea
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export const useSurveyContext = () => useContext(SurveyContext);