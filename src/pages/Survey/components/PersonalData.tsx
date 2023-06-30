import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { SurveyPersonalData } from '../../../types/SurveyPersonalData';
import { CandidateUser } from '../../../types/CandidateUser';

import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { InputDBv2 } from "../../../components/forms/InputDBv2";
import { SelectDBv2 } from '../../../components/forms/SelectDBv2';
import { useSteps } from '../../../components/ProgressBar/context/useSteps';

import { useSurveyContext } from '../context/SurveyContext';
import { AuthContext, Token } from '../../../context/auth';
import { getCandidateUser } from '../../../services/api';

import { calculateYears } from "../../../utils/DateUtil";
import { formatDateISO } from "../../../utils/FormatUtil";
import { getCities } from '../../../services/apiGeoNames';
import { AutocompleteDBv2 } from '../../../components/forms/AutocompleteDBv2';

const schema = yup
  .object()
  .shape(
    {
      name: yup.string()
        .required('Nome obrigatório')
        .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s ]*)$/gi, "Aceita apenas carateres alfabéticos e espaços"),
      genre: yup.string().required('Gênero obrigatório'),
      birth: yup.date()
        .required('Data de Nascimento obrigatório').typeError('Data de Nascimento obrigatório')
        .max(calculateYears(new Date(), -16), "Idade mínima permitida é de 16 anos"),
      residencePlace: yup.string().required('Local de residência obrigatório'),
    }
  )
  .required();


export function PersonalData() {
  const { surveyPersonalData, setSurveyPersonalData, updatedSurveyPersonalData } = useSurveyContext();
  const { nextStep } = useSteps();
  const [candidateUser, setCandidateUser] = useState<CandidateUser>({} as CandidateUser);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
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

    if (cityName.length > 4 && citiesList.length > 5 &&
      citiesList[0].startsWith(cityName.substring(0, 2))) {
      setCitiesSuggestions(citiesList.filter(city => city.startsWith(cityName)));
      return
    }

    if (cityName.length >= 3) {
      getCities(cityName.split(' - ')[0])
        .then(response => {
          if (event.target.value == cityName) {
            setCitiesList(response.map(city => `${city.cityName} - ${city.regionName} - ${city.countryCode}`))
            setCitiesSuggestions(response.map(city => `${city.cityName} - ${city.regionName} - ${city.countryCode}`))
          }
        });
    } else {
      citiesSuggestions.length &&
        setCitiesSuggestions([]);
    }

  }


  const handleUpdateSurvey: SubmitHandler<SurveyPersonalData> = async (values, event) => {
    event?.preventDefault();

    // Simulando a espera da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    //setSurveyPersonalData(values);

    updatedSurveyPersonalData(values);

    console.log("Survey[Form]: ", values);
    console.log("Survey[Context]: ", surveyPersonalData);

    nextStep();
  };


  useEffect(() => {

    /* async function getUserToken() {
      const token = getToken();

      if (!token) {
        return;
      }

      try {
        const { sub } = jwt_decode<Token>(token);

        await getCandidateUser(String(sub)).then((response) => {
          setCandidateUser(response.data);
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
    getUserToken(); */

    setFocus("name");
    setIsLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (!Object.keys(candidateUser).length) return;

    setValue('name', candidateUser?.name);

  }, [candidateUser]);


  return (
    <form
      className="mx-auto mt-[2rem] mb-[7.692rem] w-[66rem]"
      noValidate
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <Heading type="xxs" className="text-center text-grey-#4">
        Crie seu perfil.
      </Heading>

      <fieldset className="w-full flex flex-col gap-[2rem] mt-4 py-16 pl-[7.7rem] pr-[7.8rem] rounded-[2.233rem] bg-white">

        <InputDBv2
          label="Nome completo"
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
          className={`text-black opacity-80 font-normal ${errors.residencePlace?.message ? "mt-[-2.5rem]" : "mt-[-3.6rem]"} `}
        >
          *Campos obrigatórios
        </Text>
      </fieldset>

      <nav className="mt-[4rem] flex gap-[4.1rem] justify-center">
        <Button
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          disabled
        >
          Voltar
        </Button>

        <Button
          type="submit"
          className="w-[10.7rem] text-[1.4rem] leading-[1.82rem] tracking-[0.091rem] font-semibold normal-case"
          fill
          disabled={isSubmitting}
        >
          Continuar
        </Button>
      </nav>

    </form>

  );
}