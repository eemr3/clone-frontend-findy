import { StepsProvider } from "../../components/ProgressBar/context/useSteps";
import { AddSurvey } from "./AddSurvey";
import { SurveyProvider } from "./context/SurveyContext";

export function Survey() {
  return (
    <SurveyProvider>
      <StepsProvider>
        <AddSurvey />
      </StepsProvider>
    </SurveyProvider>
  );
}