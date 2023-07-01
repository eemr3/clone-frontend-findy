import { useEffect, useState } from "react";

import { Heading } from "../../../components/Heading";
import { useSteps } from "../../../components/ProgressBar/context/useSteps";
import { SurveyIdentflyngNeeds } from "../../../types/SurveyIdentflyngNeeds";
import { SurveyNav } from "./SurveyNav";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  required_field: yup
    .array()
    .min(1)
    .of(yup.string()
    .required()),
  required_field2: yup
    .array()
    .min(1)
    .of(yup.string()
    .required()),   
});

export function IdentifyingNeeds() {
  const [activeSubmit, setActiveSubmit] = useState(false)

  const [requiredFieldCheck, setRequiredFieldCheck] = useState(false);
  const [requiredFieldCheck2, setRequiredFieldCheck2] = useState(false);
  const [requiredFieldCheck3, setRequiredFieldCheck3] = useState(false);
  const [requiredFieldCheck4, setRequiredFieldCheck4] = useState(false);
  const [requiredFieldCheck5, setRequiredFieldCheck5] = useState(false);
  const [requiredFieldCheck6, setRequiredFieldCheck6] = useState(false);
  const [requiredFieldCheck7, setRequiredFieldCheck7] = useState(false);

  const [requiredField2Check, setRequiredField2Check] = useState(false);
  const [requiredField2Check2, setRequiredField2Check2] = useState(false);
  const [requiredField2Check3, setRequiredField2Check3] = useState(false);
  const [requiredField2Check4, setRequiredField2Check4] = useState(false);
  const [requiredField2Check5, setRequiredField2Check5] = useState(false);
  const [requiredField2Check6, setRequiredField2Check6] = useState(false);
  const [requiredField2Check7, setRequiredField2Check7] = useState(false);

  const requiredFieldCheckGroup = {
    requiredFieldCheck,
    requiredFieldCheck2, 
    requiredFieldCheck3, 
    requiredFieldCheck4, 
    requiredFieldCheck5, 
    requiredFieldCheck6,
    requiredFieldCheck7,
  };

  const requiredFiel2dCheckGroup = {
    requiredField2Check,
    requiredField2Check2, 
    requiredField2Check3, 
    requiredField2Check4, 
    requiredField2Check5, 
    requiredField2Check6, 
    requiredField2Check7,
  };


  const { nextStep, prevStep } = useSteps();
  
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    //setValue,
    //setFocus,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SurveyIdentflyngNeeds>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const handleUpdateSurvey: SubmitHandler<SurveyIdentflyngNeeds> = async (values, event) => {
    event?.preventDefault();
  
    setActiveSubmit(true);

    localStorage.setItem('@Findy:surveyIdentflyngNeeds', JSON.stringify(requiredFieldCheckGroup));
    localStorage.setItem('@Findy:surveyIdentflyngNeeds2', JSON.stringify(requiredFiel2dCheckGroup));

    navigate('/dashboard');
  
    // Simulando a espera da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    nextStep();
  };

  useEffect(() => {
    const storedRequiredFieldCheckGroup = JSON.parse(localStorage.getItem('@Findy:surveyIdentflyngNeeds') ?? 'null');
    const storedRequiredField2CheckGroup = JSON.parse(localStorage.getItem('@Findy:surveyIdentflyngNeeds2') ?? 'null');
  
    if (storedRequiredFieldCheckGroup) {
      setRequiredFieldCheck(storedRequiredFieldCheckGroup.requiredFieldCheck);
      setRequiredFieldCheck2(storedRequiredFieldCheckGroup.requiredFieldCheck2);
      setRequiredFieldCheck3(storedRequiredFieldCheckGroup.requiredFieldCheck3);
      setRequiredFieldCheck4(storedRequiredFieldCheckGroup.requiredFieldCheck4);
      setRequiredFieldCheck5(storedRequiredFieldCheckGroup.requiredFieldCheck5);
      setRequiredFieldCheck6(storedRequiredFieldCheckGroup.requiredFieldCheck6);
      setRequiredFieldCheck7(storedRequiredFieldCheckGroup.requiredFieldCheck7);
    }
  
    if (storedRequiredField2CheckGroup) {
      setRequiredField2Check(storedRequiredField2CheckGroup.requiredField2Check);
      setRequiredField2Check2(storedRequiredField2CheckGroup.requiredField2Check2);
      setRequiredField2Check3(storedRequiredField2CheckGroup.requiredField2Check3);
      setRequiredField2Check4(storedRequiredField2CheckGroup.requiredField2Check4);
      setRequiredField2Check5(storedRequiredField2CheckGroup.requiredField2Check5);
      setRequiredField2Check6(storedRequiredField2CheckGroup.requiredField2Check6);
      setRequiredField2Check7(storedRequiredField2CheckGroup.requiredField2Check7);
    }
  }, []);
  
  return (
    <form
      className="mx-auto mt-[2rem] w-[66rem] mb-[7.692rem]"
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <Heading type="xxs" className="text-center text-grey-#4 mb-[1rem]">
        Identificação das necessidades.
      </Heading>

      <fieldset
        className={`w-full flex flex-col py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white`}
      >
        <div className="mb-[1rem]">
          <Heading
            type="xl"
            className={
              errors.required_field
                ? 'text-left text-red mt-[2rem]'
                : 'text-left text-[#000000] mt-[2rem]'
            }
          >
            Quais são as principais dificuldades que você enfrenta para alcançar
            seus objetivos profissionais?*
          </Heading>
          <span 
            className={
              errors.required_field
              ? 'text-[1.2rem] text-[red] mb-[2rem]'
              : 'text-[1.2rem] text-[#000000CC] mb-[2rem]'
            }
          >*Campo obrigatório</span>
            
          <ul className="mt-[2rem]">
            <li className="flex gap-[0.6rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Falta de experiência prática</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck2}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck2(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Dificuldade em encontrar oportunidades relevantes</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck3}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck3(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Falta de networking</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck4}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck4(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Acesso limitado a recursos educacionais</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck5}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck5(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Concorrência acirrada no mercado de trabalho</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck6}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck6(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Barreiras financeiras</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredFieldCheck7}
                  {...register('required_field')}
                  onChange={(e) => {
                    setRequiredFieldCheck7(e.target.checked)
                    clearErrors('required_field');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Falta de orientação e mentoria</label>
            </li>
          </ul>

          <Heading
            type="xl"
            className={
              errors.required_field2
                ? 'text-left text-red mt-[2rem]'
                : 'text-left text-[#000000] mt-[2rem]'
            }
          >
            Como você espera que a Findy ajude em seu desenvolvimento profissional?*
          </Heading>
          <span 
            className={
              errors.required_field2
              ? 'text-[1.2rem] text-[red] mb-[2rem]'
              : 'text-[1.2rem] text-[#000000CC] mb-[2rem]'
            }
          >*Campo obrigatório</span>

          <ul className="mt-[2rem]">
            <li className="flex gap-[0.6rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Conexões com profissionais da área</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check2}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check2(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Acesso a oportunidades de trabalho relevantes</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check3}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check3(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Recursos educacionais de qualidade</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check4}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check4(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Mentoria e orientação personalizada</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check5}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check5(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Aplicação prática das habilidades técnicas e soft skills</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check6}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check6(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Suporte na transição de carreira</label>
            </li>

            <li className="flex gap-[0.6rem] mt-[0.3rem]">
              <div
                className={
                  errors.required_field2
                    ? 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                    : 'h-[2.0rem] w-[2.0rem] relative rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                }
              >
                <input
                  className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                  type="checkbox"
                  checked={requiredField2Check7}
                  {...register('required_field2')}
                  onChange={(e) => {
                    setRequiredField2Check7(e.target.checked)
                    clearErrors('required_field2');
                  }}
                />
              </div>
              <label className="text-[1.6rem] text-[#000] font-medium">Networking e eventos da área</label>
            </li>
          </ul>
        </div>
      </fieldset>

      <SurveyNav 
        isSubmitting={isSubmitting}
        prevStep={prevStep}
        submitLabel="Salvar e sair"
      />
    </form>
  );
}
