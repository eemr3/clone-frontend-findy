import jwt_decode from 'jwt-decode';

import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SurveyPersonalData } from '../../../types/SurveyPersonalData';

import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { InputDBv2 } from '../../../components/forms/InputDBv2';
import { SelectDBv2 } from '../../../components/forms/SelectDBv2';

import { useSteps } from '../../../components/ProgressBar/context/useSteps';

import { AuthContext, Token } from '../../../context/auth';
import { useSurveyContext } from '../context/SurveyContext';

import { calculateYears } from '../../../utils/DateUtil';
import { formatDateISO } from '../../../utils/FormatUtil';

import { AutocompleteDBv2 } from '../../../components/forms/AutocompleteDBv2';
import { getCities } from '../../../services/apiGeoNames';

import { SurveyNav } from './SurveyNav';

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Nome obrigatório')
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s ]*)$/gi,
        'Aceita apenas carateres alfabéticos e espaços',
      ),
    genre: yup.string().required('Gênero obrigatório'),
    birth: yup
      .date()
      .required('Data de Nascimento obrigatório')
      .typeError('Data de Nascimento obrigatório')
      .max(calculateYears(new Date(), -16), 'Idade mínima permitida é de 16 anos'),
    residencePlace: yup.string().required('Local de residência obrigatório'),
  })
  .required();

export function PersonalData() {
  const { surveyPersonalData, updatedSurveyPersonalData } = useSurveyContext();
  const { nextStep } = useSteps();
  const { getToken } = useContext(AuthContext);
  const [citiesSuggestions, setCitiesSuggestions] = useState<string[]>([]);
  const [citiesList, setCitiesList] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SurveyPersonalData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: 'onBlur',
    defaultValues: {
      name: surveyPersonalData ? surveyPersonalData.name : '',
      genre: surveyPersonalData ? surveyPersonalData.genre : '',
      birth: surveyPersonalData ? surveyPersonalData.birth : undefined,
      residencePlace: surveyPersonalData ? surveyPersonalData.residencePlace : '',
    },
  });

  function handleCitiesSuggestions(event: ChangeEvent<HTMLInputElement>) {
    const cityName = event.target.value;

    if (
      cityName.length > 4 &&
      citiesList.length > 5 &&
      citiesList[0].startsWith(cityName.substring(0, 2))
    ) {
      setCitiesSuggestions(citiesList.filter((city) => city.startsWith(cityName)));
      return;
    }

    if (cityName.length >= 3) {
      getCities(cityName.split(' - ')[0]).then((response) => {
        if (event.target.value == cityName) {
          setCitiesList(
            response.map(
              (city) => `${city.cityName} - ${city.regionName} - ${city.countryName}`,
            ),
          );
          setCitiesSuggestions(
            response.map(
              (city) => `${city.cityName} - ${city.regionName} - ${city.countryName}`,
            ),
          );
        }
      });
    } else {
      citiesSuggestions.length && setCitiesSuggestions([]);
    }
  }

  const handleUpdateSurvey: SubmitHandler<SurveyPersonalData> = async (values, event) => {
    event?.preventDefault();

    // Simulando a espera da API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updatedSurveyPersonalData(values);

    nextStep();
  };

  useEffect(() => {
    if (!surveyPersonalData) {
      const token = getToken();
      const { name } = jwt_decode<Token>(token);
      setValue('name', name);
    }

    setFocus('name');
  }, []);

  return (
    <form
      className="mx-auto mb-[7.692rem] mt-[2rem] w-[66rem]"
      noValidate
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <Heading type="xxs" className="text-center text-grey-#4">
        Crie seu perfil.
      </Heading>

      <fieldset className="mt-4 flex w-full flex-col gap-[2rem] rounded-[2.233rem] bg-white py-16 pl-[7.7rem] pr-[7.8rem]">
        <InputDBv2
          label="Nome completo"
          readOnly
          requiredField
          placeholder="Digite seu nome"
          maxLength={70}
          error={errors.name?.message}
          {...register('name')}
        />

        <SelectDBv2
          options={['Masculino', 'Feminino', 'Outro', 'Prefiro não informar']}
          label="Gênero"
          requiredField
          placeholder="Selecione uma opção"
          error={errors.genre?.message}
          {...register('genre')}
        />

        <InputDBv2
          label="Nascimento"
          type="date"
          max={formatDateISO(calculateYears(new Date(), -16))}
          requiredField
          placeholder="Selecione uma data"
          error={errors.birth?.message}
          {...register('birth')}
        />

        <AutocompleteDBv2
          options={citiesSuggestions}
          label="Local de residência"
          requiredField
          placeholder="Digite seu local de residência"
          error={errors.residencePlace?.message}
          {...register('residencePlace', {
            onChange(event) {
              handleCitiesSuggestions(event);
            },
          })}
        />

        <Text
          type="sm"
          className={`font-normal text-black opacity-80 ${
            errors.residencePlace?.message ? 'mt-[-2.5rem]' : 'mt-[-3.6rem]'
          } `}
        >
          *Campos obrigatórios
        </Text>
      </fieldset>

      <SurveyNav isSubmitting={isSubmitting} submitLabel="Continuar" />
    </form>
  );
}
