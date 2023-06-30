import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"
import { SurveyPersonalData } from "../../../types/SurveyPersonalData";
import { SurveyMarketData } from "../../../types/SurveyMarketData";
import { SurveyProfissionalArea } from "../../../types/SurveyProfissionalArea";
import { SurveyIdentflyngNeeds } from "../../../types/SurveyIdentflyngNeeds";

type SurveyProviderProps = {
  children: ReactNode;
}

type SurveyContextProps = {
  surveyPersonalData: SurveyPersonalData;
  surveyMarketData: SurveyMarketData;
  setSurveyMarketData: Dispatch<SetStateAction<SurveyMarketData>>;
  surveyProfissionalArea: SurveyProfissionalArea;
  setSurveyProfissionalArea: Dispatch<SetStateAction<SurveyProfissionalArea>>;
  surveyIdentflyingNeeds: SurveyIdentflyngNeeds;
  setSurveyIdentflyingNeeds: Dispatch<SurveyIdentflyngNeeds>;
  updatedSurveyPersonalData: (data: SurveyPersonalData) => void;
  //initializeSurvey: () => void;
}

export const SurveyContext = createContext({} as SurveyContextProps);

export function SurveyProvider({ children }: SurveyProviderProps) {
  const [surveyPersonalData, setSurveyPersonalData] = useState<SurveyPersonalData>(() => {
    const storagedSurveyPersonalData = localStorage.getItem('@Findy:surveyPersonalData');

    if (storagedSurveyPersonalData)
      return JSON.parse(storagedSurveyPersonalData);

    return
  });

  const [surveyMarketData, setSurveyMarketData] = useState<SurveyMarketData>({} as SurveyMarketData);
  const [surveyProfissionalArea, setSurveyProfissionalArea] = useState<SurveyProfissionalArea>({} as SurveyProfissionalArea);
  const [surveyIdentflyingNeeds, setSurveyIdentflyingNeeds] = useState<SurveyIdentflyngNeeds>({} as SurveyIdentflyngNeeds);

  function updatedSurveyPersonalData(data: SurveyPersonalData) {
    setSurveyPersonalData(data);
    localStorage.setItem('@Findy:surveyPersonalData', JSON.stringify(data));
  }

  return (
    <SurveyContext.Provider
      value={{
        surveyPersonalData,
        surveyMarketData,
        setSurveyMarketData,
        surveyProfissionalArea,
        setSurveyProfissionalArea,
        surveyIdentflyingNeeds,
        setSurveyIdentflyingNeeds,
        updatedSurveyPersonalData
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export const useSurveyContext = () => useContext(SurveyContext);