import { createContext, useContext, useState } from "react";

interface StepsProviderProps {
  children: React.ReactNode;
}

interface StepsContextProps {
  activeStep: number;
  setInitialStep: (newStep: number) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const StepsContext = createContext({} as StepsContextProps);

export function StepsProvider({ children }: StepsProviderProps) {
  const [activeStep, setActiveStep] = useState<number>(0);


  function setInitialStep(newStep: number) {
    setActiveStep(newStep)
  }

  function prevStep() {
    setActiveStep(activeStep - 1)
  }

  function nextStep() {
    setActiveStep(activeStep + 1)
  }

  return (
    <StepsContext.Provider value={{ activeStep, setInitialStep, prevStep, nextStep }}>
      {children}
    </StepsContext.Provider>
  )
}


export function useSteps() {
  const context = useContext(StepsContext);

  return context;
}