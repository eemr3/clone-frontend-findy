import { useEffect } from 'react';

import { Text } from '../../components/Text';
import { HeaderSurvey } from './components/HeaderSurvey';
import { ProgressBar } from '../../components/ProgressBar';
import { useSteps } from '../../components/ProgressBar/context/useSteps';
import { MarketData } from './components/MarketData';
import { PersonalData } from './components/PersonalData';
import { ProfissionalArea } from './components/ProfissionalArea';
import { ProfessionalAchievement } from './components/ProfessionalAchievement';
import { IdentifyingNeeds } from './components/IdentifyingNeeds';

export function AddSurvey() {
  const { activeStep, setInitialStep } = useSteps();

  useEffect(() => {
    setInitialStep(0);
  }, [])

  return (
    <div className="w-max-[144rem] min-h-screen flex flex-col bg-blue-dark-#1">

      <HeaderSurvey />

      <ProgressBar stepAmount={5} activeStep={activeStep} />

      {activeStep == 0 &&
        <PersonalData />
      }

      {activeStep == 1 &&
        <MarketData />
      }

      {activeStep == 2 &&
        <ProfissionalArea />
      }

      {activeStep == 3 &&
        <ProfessionalAchievement />
      }

      {activeStep == 4 &&
        <IdentifyingNeeds />
      }

      <Text
        type="sm"
        className="text-white mx-auto mt-auto mb-[1.7rem]"
      >
        © Todos direitos reservados a Findy.
      </Text>


    </div>
  );
}
