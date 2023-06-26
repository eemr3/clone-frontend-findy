import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { Survey } from "../../../types/Survey";
import { SurveyMarketData } from "../../../types/SurveyMarketData";
import { SurveyProfissionalArea } from "../../../types/SurveyProfissionalArea";
import { SurveyIdentflyngNeeds } from "../../../types/SurveyIdentflyngNeeds";

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
  const [surveyIdentflyingNeeds, setSurveyIdentflyingNeeds] = useState<SurveyIdentflyngNeeds>({} as SurveyIdentflyngNeeds);

  function updatedSurveyPersonalData(data: SurveyPersonalData) {
    setSurveyPersonalData(data);
    localStorage.setItem('@Findy:surveyPersonalData', JSON.stringify(data));
  }

  function updatedSurveyPersonalData(data: SurveyPersonalData) {
    setSurveyPersonalData(data);
    localStorage.setItem('@Findy:surveyPersonalData', JSON.stringify(data));
  }

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