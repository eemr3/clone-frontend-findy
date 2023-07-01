import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Button } from '../../../components/Button';
import { useSteps } from '../../../components/ProgressBar/context/useSteps';

const validationSchema = Yup.object().shape({
  professionalAchievement: Yup.number()
    .nullable()
    .required('Esse campo é obrigatório')
    .min(0, 'O valor mínimo é 0')
    .max(10, 'O valor máximo é 10'),
  feedback: Yup.string().required('Campos obrigatórios')
});

export function ProfessionalAchievement() {
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { nextStep, prevStep } = useSteps();

  //refatorar a validação para seguir o mesmo padrão dos outros componentes
  function handleOptionSelect(index: number) {
    setSelected(index);
    setErrors({});
  }

  function handleFeedbackChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setFeedback(event.target.value);
    setErrors({});
  }

  function handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsButtonClicked(true);

    if (selected === null || !feedback) {
      return;
    }
    
    nextStep()

    validationSchema
      .validate({ professionalAchievement: selected, feedback })
      .then(() => {
        saveToBackend(selected, feedback);
      })
      .catch((error: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      });
  }

  function saveToBackend(value: number, feedback: string) {

    const storageProfessionalAchievement = {
      value: value,
      feedback: feedback
    };

    const convertedToString = JSON.stringify(storageProfessionalAchievement)
    localStorage.setItem('@Findy:surveyProfessionalAchievement', JSON.stringify(storageProfessionalAchievement)); 

  }

  useEffect(() => {
    const dataInStorage = localStorage.getItem('@Findy:surveyProfessionalAchievement');
    
    if (dataInStorage) {
      const { value, feedback } = JSON.parse(dataInStorage);
      setSelected(value);
      setFeedback(feedback);
    }
  }, []);

  return (
    <form className="mx-auto mt-[2rem] flex flex-col items-center mb-[7.692rem] w-[66rem]" noValidate>
      <h1 className="text-[2.4rem] text-grey-#4 mt-[3.357rem]">Realização profissional e motivações.</h1>
      <fieldset className="w-full flex flex-col mt-4 py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white">
        <h1 className="text-[1.6rem] text-[#000000CC]">
          Em uma escala de 0 a 10, o quanto você se sente realizado(a) profissionalmente*?
        </h1>
        <div className="flex justify-between mt-[2.3rem] ">
          <span className="text-[1.2rem] text-[#000000CC] w-[3.6rem] border border-white">
            Nada realizado
          </span>
          <div className="flex justify-end">
            <span className="text-right text-[1.2rem] text-[#000000CC]">
              Totalmente <br />
              <span className="ml-auto text-[1.2rem] text-[#000000CC]">realizado</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[2.8rem]">
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">0</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 0 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(0)}
              style={{
                boxShadow:
                  selected === 0
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">1</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 1 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(1)}
              style={{
                boxShadow:
                  selected === 1
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">2</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 2 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(2)}
              style={{
                boxShadow:
                  selected === 2
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">3</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 3 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(3)}
              style={{
                boxShadow:
                  selected === 3
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">4</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 4 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(4)}
              style={{
                boxShadow:
                  selected === 4
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">5</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 5 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(5)}
              style={{
                boxShadow:
                  selected === 5
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">6</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 6 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(6)}
              style={{
                boxShadow:
                  selected === 6
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">7</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 7 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(7)}
              style={{
                boxShadow:
                  selected === 7
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">8</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 8 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(8)}
              style={{
                boxShadow:
                  selected === 8
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">9</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 9 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(9)}
              style={{
                boxShadow:
                  selected === 9
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
          <div className='flex flex-col items-center'>
            <span className="text-[1.4rem] text-grey-#1">10</span>
            <div
              className={`w-8 h-8 rounded-full ${selected === 10 ? 'border border-green-medium bg-green-dark' : selected === null && isButtonClicked ? 'border border-red' : 'border border-green-medium'
                }`}
              onClick={() => handleOptionSelect(10)}
              style={{
                boxShadow:
                  selected === 10
                    ? '0 0 0 2px white, 0 0 0 3px #01A195'
                    : 'none'
              }}
            ></div>
          </div>
        </div>
        <h1 className="text-[1.6rem] text-[#000000] mt-[3.1rem]">
          O que o motiva a buscar sua função atual ou desejada na área de tecnologia?
        </h1>
        <textarea
          className={`p-2 h-[7.2rem] w-[50.6rem] text-[1.4rem] text-grey-#2 rounded-lg border ${errors.feedback || (isButtonClicked && !feedback) ? 'border-red' : 'border-[#000000]'
            }`}
          placeholder="Digite algo..."
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        {errors.feedback && <span className="text-red text[1.4rem]">{errors.feedback}</span>}
        <span className={`text-[1.4rem] ${errors.feedback || (isButtonClicked && !feedback) ? 'text-red' : 'text-[#000000]'
          }`}>
          *Campos obrigatórios
        </span>

      </fieldset>
      <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
        <Button
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          onClick={prevStep}
        >
          Voltar
        </Button>

        <Button
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          fill
          disabled={activeSubmit}
          onClick={handleFormSubmit}
        >
          Continuar
        </Button>
      </nav>
    </form>
  );
};
