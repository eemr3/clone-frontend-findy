import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectDBv2 } from "../../../components/forms/SelectDBv2";
import { Button } from "../../../components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSteps } from "../../../components/ProgressBar/context/useSteps";
import { useSurveyContext } from "../context/SurveyContext";
import { SurveyProfissionalArea } from "../../../types/SurveyProfissionalArea";
import { ProfissionalAreaList } from "../../../utils/ProfissionalAreaList";
import { SurveyNav } from "./SurveyNav";

const schema = yup
  .object()
  .shape({
    situation: yup.string().required("*Campo obrigatório"),
    area: yup.string().required("*Campo obrigatório"),
    transition: yup.string().required("*Campo obrigatório"),
  })
  .required();

export function ProfissionalArea() {
  const { surveyProfissionalArea, setSurveyProfissionalArea, updatedProfissionalAreaData } =
    useSurveyContext();
  const { nextStep, prevStep } = useSteps();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SurveyProfissionalArea>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: "onBlur",
    defaultValues: {
      situation: surveyProfissionalArea ? surveyProfissionalArea.situation : "",
      area: surveyProfissionalArea ? surveyProfissionalArea.area : "",
      transition: surveyProfissionalArea
        ? surveyProfissionalArea.transition
        : "",
    },
  });
  
  const handleUpdateSurvey: SubmitHandler<SurveyProfissionalArea> = async (values, event) => {
    event?.preventDefault();

    // Simulando a espera da API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // setSurveyProfissionalArea(values);
    updatedProfissionalAreaData(values)

    nextStep();
  };

  useEffect(() => {
    setFocus("situation");
  }, []);

  console.log("surveyProfissionalArea", surveyProfissionalArea);

  return (
    <form
      className="mx-auto mt-[2rem] flex flex-col items-center h-screen w-[66rem]" 
      noValidate 
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <h1 className="mt-[3.343rem] text-[2.4rem] text-grey-#4">
        Área Profissional
      </h1>
      <fieldset className="mt-4 flex w-full flex-col gap-[2rem] rounded-[2.233rem] bg-white py-16 pl-[7.7rem] pr-[7.8rem]">
        <SelectDBv2
          options={[
            "Empregado em tempo integral na área de tecnologia",
            "Empregado em tempo integral fora da área de tecnologia",
            "Estudante ou estagiário na área de tecnologia",
            "Desempregado buscando oportunidades na área de tecnologia",
          ]}
          label="Qual sua situação profissão atual?"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.situation?.message}
          {...register("situation")}
        />

        <SelectDBv2
          options={ProfissionalAreaList}
          label="Qual é sua área de atuação atual ou mais recente?"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.area?.message}
          {...register("area")}
        />

        <SelectDBv2
          options={[
            "Transição de carreira dentro da área de TI",
            "Transição de carreira para a área de TI",
            "Consolidar os conhecimentos dentro da minha área",
            "Ajudar outras pessoas a aprimorar seus conhecimentos",
          ]}
          label="Qual é o seu objetivo principal?"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.transition?.message}
          {...register("transition")}
        />
      </fieldset>

      <SurveyNav
        isSubmitting={isSubmitting}
        prevStep={prevStep} 
      />
    </form>
  );
}
