import { useState } from "react";

import { Heading } from "../../../components/Heading";
import { useSteps } from "../../../components/ProgressBar/context/useSteps";
import { useSurveyContext } from "../context/SurveyContext";
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

  const { surveyIdentflyingNeeds, setSurveyIdentflyingNeeds } = useSurveyContext();
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
    defaultValues: {
      required_field: surveyIdentflyingNeeds ? surveyIdentflyingNeeds.required_field : false,
      required_field2: surveyIdentflyingNeeds ? surveyIdentflyingNeeds.required_field2 : false,
    },
  });

  const handleUpdateSurvey: SubmitHandler<SurveyIdentflyngNeeds> = async (values, event) => {
    event?.preventDefault();

    setActiveSubmit(true);

    navigate('/dashboard');

    // Simulando a espera da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    nextStep();
  };

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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
                  {...register('required_field2')}
                  onChange={() => {
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
