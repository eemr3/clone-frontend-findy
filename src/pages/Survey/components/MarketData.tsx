import { useEffect, useState } from "react";
import { Heading } from "../../../components/Heading";
import { SelectDBv2 } from "../../../components/forms/SelectDBv2";
import { Button } from "../../../components/Button";
import * as yup from "yup";
import { Text } from "../../../components/Text";
import { useSteps } from "../../../components/ProgressBar/context/useSteps";
import { SurveyMarketData } from "../../../types/SurveyMarketData";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSurveyContext } from "../context/SurveyContext";
import { SocialMediaList } from "../../../utils/SocialMediaList";
import { SurveyNav } from "./SurveyNav";

interface Errors {
  findySource?: string;
}

const validationSchema = yup.object().shape({
  findySource: yup.string().required("Informação onde conheceu a Findy obrigatória."),
}).required();

export function MarketData() {
  const { surveyMarketData, setSurveyMarketData, updatedSurveyMarketData } = useSurveyContext();
  const { nextStep, prevStep } = useSteps();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SurveyMarketData>({
    resolver: yupResolver(validationSchema),
    shouldFocusError: true,
    mode: 'onBlur',
    defaultValues: {
      findySource: surveyMarketData ? surveyMarketData.findySource : '',
    },
  });

  const handleUpdateSurvey: SubmitHandler<SurveyMarketData> = async (values, event) => {
    event?.preventDefault();

    // Simulando a espera da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    //setSurveyMarketData(values);

    updatedSurveyMarketData(values)
    
    nextStep();
  };


  useEffect(() => {
    setFocus("findySource");
  }, [])

  console.log("surveyMarketData ", surveyMarketData)

  return (
    <form
      className="mx-auto mt-[2rem] w-[66rem] mb-[7.692rem]"
      noValidate
      onSubmit={handleSubmit(handleUpdateSurvey)}>
      <Heading type="xxs" className="text-center text-grey-#4 mb-[1rem]">
        Como ficou sabendo da Findy?*
      </Heading>

      <fieldset
        className={`w-full flex flex-col py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white`}
      >
        <SelectDBv2
          options={SocialMediaList}
          label="Como ficou sabendo da Findy?"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.findySource?.message}
          {...register("findySource")}
        />

        <Text
          type="sm"
          className={`text-black opacity-80 font-normal ${errors.findySource?.message ? "" : "mt-[-1.1rem]"} `}
        >
          *Campos obrigatórios
        </Text>
      </fieldset>

      <SurveyNav
        isSubmitting={isSubmitting}
        prevStep={prevStep}
        submitLabel="Continuar"
      />
    </form>
  );
}
