import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { SurveyIdentflyngNeeds } from '../../../types/SurveyIdentflyngNeeds';
import { SurveyMarketData } from '../../../types/SurveyMarketData';
import { SurveyPersonalData } from '../../../types/SurveyPersonalData';
import { SurveyProfissionalArea } from '../../../types/SurveyProfissionalArea';

type SurveyProviderProps = {
  children: ReactNode;
};

type SurveyContextProps = {
  surveyPersonalData: SurveyPersonalData;
  surveyMarketData: SurveyMarketData;
  setSurveyMarketData: Dispatch<SetStateAction<SurveyMarketData>>;
  surveyProfissionalArea: SurveyProfissionalArea;
  setSurveyProfissionalArea: Dispatch<SetStateAction<SurveyProfissionalArea>>;

  surveyIdentflyingNeeds?: SurveyIdentflyngNeeds;
  setSurveyIdentflyingNeeds?: Dispatch<SurveyIdentflyngNeeds>;

  //initializeSurvey: () => void;
  updatedSurveyPersonalData: (data: SurveyPersonalData) => void;
  updatedSurveyMarketData: (data: SurveyMarketData) => void;
  updatedProfissionalAreaData: (data: SurveyProfissionalArea) => void;
};

export const SurveyContext = createContext({} as SurveyContextProps);

export function SurveyProvider({ children }: SurveyProviderProps) {
  const [surveyPersonalData, setSurveyPersonalData] = useState<SurveyPersonalData>(() => {
    const storagedSurveyPersonalData = localStorage.getItem('@Findy:surveyPersonalData');

    if (storagedSurveyPersonalData) return JSON.parse(storagedSurveyPersonalData);

    return;
  });

  const [surveyMarketData, setSurveyMarketData] = useState<SurveyMarketData>(() => {
    const storagedSurveyMarketData = localStorage.getItem('@Findy:surveyMarketData');

    function updatedSurveyPersonalData(data: SurveyPersonalData) {
      setSurveyPersonalData(data);
      localStorage.setItem('@Findy:surveyPersonalData', JSON.stringify(data));
    }

    if (storagedSurveyMarketData) return JSON.parse(storagedSurveyMarketData);
  });

  const [surveyProfissionalArea, setSurveyProfissionalArea] =
    useState<SurveyProfissionalArea>(() => {
      const storageSurveyProfissionalAreaData = localStorage.getItem(
        '@Findy:surveyProfissionalAreaData',
      );

      if (storageSurveyProfissionalAreaData)
        return JSON.parse(storageSurveyProfissionalAreaData);
    });

  function updatedSurveyPersonalData(data: SurveyPersonalData) {
    setSurveyPersonalData(data);
    localStorage.setItem('@Findy:surveyPersonalData', JSON.stringify(data));
  }

  function updatedSurveyMarketData(data: SurveyMarketData) {
    setSurveyMarketData(data);
    localStorage.setItem('@Findy:surveyMarketData', JSON.stringify(data));
  }

  function updatedProfissionalAreaData(data: SurveyProfissionalArea) {
    setSurveyProfissionalArea(data);
    localStorage.setItem('@Findy:surveyProfissionalAreaData', JSON.stringify(data));
  }

  return (
    <SurveyContext.Provider
      value={{
        surveyPersonalData,
        surveyMarketData,
        setSurveyMarketData,
        surveyProfissionalArea,
        setSurveyProfissionalArea,
        updatedSurveyPersonalData,
        updatedSurveyMarketData,
        updatedProfissionalAreaData,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export const useSurveyContext = () => useContext(SurveyContext);
