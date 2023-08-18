import { Button } from "../../../components/Button";

interface SurveyNavProps {
  prevStep?: () => void;
  isSubmitting: boolean;
  submitLabel?: string;
  disabledSubmitting?: boolean;
}

export function SurveyNav({ isSubmitting, prevStep, submitLabel = 'Continuar', disabledSubmitting = false }: SurveyNavProps) {
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
        disabled={isSubmitting || disabledSubmitting}
      >
        {submitLabel}
      </Button>
    </nav>
  )
}