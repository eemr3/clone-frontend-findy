import { Button } from "../../../components/Button";

interface SurveyNavProps {
  prevStep?: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function SurveyNav({ isSubmitting, prevStep, submitLabel = 'Continuar' }: SurveyNavProps) {
  return (
    <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
      <Button 
        className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
        onClick={prevStep}
        disabled={!prevStep}
      >
        Voltar
      </Button>

      <Button
        type="submit"
        className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
        fill
        disabled={isSubmitting}
      >
        {submitLabel}
      </Button>
    </nav>
  )
}