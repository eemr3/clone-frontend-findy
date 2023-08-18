import { useEffect, useState } from 'react';
import { Heading } from '../../../components/Heading';
import { SelectDBv2 } from '../../../components/forms/SelectDBv2';
import { Button } from '../../../components/Button';
import * as yup from 'yup';
import { Text } from '../../../components/Text';
import { useSteps } from '../../../components/ProgressBar/context/useSteps';
import { SurveyMarketData } from '../../../types/SurveyMarketData';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSurveyContext } from '../context/SurveyContext';
import { SocialMediaList } from '../../../utils/SocialMediaList';
import { SurveyNav } from './SurveyNav';

interface Errors {
  findySource?: string;
}

const validationSchema = yup
  .object()
  .shape({
    findySource: yup.string().required('Informação onde conheceu a Findy obrigatória.'),
  })
  .required();

export function MarketData() {
  const { surveyMarketData, updatedSurveyMarketData } =
    useSurveyContext();
  const { nextStep, prevStep } = useSteps();

  const {
    register,
    handleSubmit,
    getValues,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SurveyMarketData>({
    resolver: yupResolver(validationSchema),
    shouldFocusError: true,
    mode: 'onTouched',
    defaultValues: {
      findySource: surveyMarketData ? surveyMarketData.findySource : '',
    },
  });

  const fieldFilled = !!getValues("findySource").trim().length;

  const handleUpdateSurvey: SubmitHandler<SurveyMarketData> = async (values, event) => {
    event?.preventDefault();

    updatedSurveyMarketData(values);

    nextStep();
  };

  useEffect(() => {
    setFocus('findySource');
  }, []);

  return (
    <form
      className="mx-auto mb-[7.692rem] mt-[2rem] w-[66rem]"
      noValidate
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <Heading type="xxs" className="mb-[1rem] text-center text-grey-#4">
        Como ficou sabendo da Findy?*
      </Heading>

      <fieldset
        className={`flex w-full flex-col rounded-[2.233rem] bg-white py-16 pl-[7.7rem] pr-[7.8rem]`}
      >
        <SelectDBv2
          options={SocialMediaList}
          label="Como ficou sabendo da Findy?"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.findySource?.message}
          {...register('findySource')}
        />

        <Text
          type="sm"
          className={`font-normal text-black opacity-80 ${errors.findySource?.message ? '' : 'mt-[-1.1rem]'
            } `}
        >
          *Campos obrigatórios
        </Text>
      </fieldset>

      <SurveyNav
        isSubmitting={isSubmitting}
        disabledSubmitting={!fieldFilled}
        prevStep={prevStep}
        submitLabel="Continuar"
      />
    </form>
  );
}
