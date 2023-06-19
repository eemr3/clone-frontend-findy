interface ProgressBarProps {
  stepAmount: number;
  activeStep: number;
}

export function ProgressBar({ stepAmount, activeStep }: ProgressBarProps) {
  return (
    <ol className="max-w-[66rem] w-full mx-[auto] mt-[2rem] flex items-center">

      {[...Array(stepAmount).keys()].map(step => (
        <li key={step} className={`flex items-center ${step == (stepAmount - 1) ? "w-fit" : "w-full after:content-[''] after:w-full after:border-b after:border-green-medium after:border-[0.073rem] after:inline-block"}`}>
          <span className={`flex items-center justify-center shrink-0 rounded-full w-[2.606rem] h-[2.634rem]  border-green-medium border-[0.1rem]  text-[1.317rem] leading-[1.464rem] font-medium  ${activeStep == step ? 'bg-green-medium text-blue-dark-#1' : 'bg-blue-dark-#1 text-green-medium'}`}>
            {step + 1}
          </span>
        </li>

      ))}

    </ol>

  );
}