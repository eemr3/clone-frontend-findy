import jwt_decode from 'jwt-decode';
import { useContext, useState } from 'react';
import { Heading } from '../../../components/Heading';
import { useSteps } from '../../../components/ProgressBar/context/useSteps';
import { SurveyNav } from './SurveyNav';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AuthContext } from '../../../context/auth';
import {
  compliteSurvey,
  createFeelings,
  createNeeds,
  createProfessionalSituation,
  createSurveyDetails,
  createSurveyMarketInformation,
} from '../../../services/api';
import { SurveyPersonalData } from '../../../types/SurveyPersonalData';
import { findyHelp, principalDifficulties } from '../data/data';
import { SurveyIdentifyingNeedsData } from '../../../types/SurveyIdentifyingNeedsData';

const schema = yup.object().shape({
  required_field: yup.array().min(1).of(yup.string().required()),
  required_field2: yup.array().min(1).of(yup.string().required()),
  principalDifficulties: yup.array().min(1).of(yup.string().required()),
  findyHelp: yup.array().min(1).of(yup.string().required()),
});

export function IdentifyingNeeds() {
  const { getToken, setFinishiedSurvey } = useContext(AuthContext);

  const [activeSubmit, setActiveSubmit] = useState(false);
  const [checkboxData, setCheckboxData] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);

  const { nextStep, prevStep } = useSteps();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SurveyIdentifyingNeedsData>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: 'onChange',
    defaultValues: {
      principalDifficulties: [],
      findyHelp: [],
    },
  });

  const fieldsFilled =
    !!getValues('principalDifficulties').length && !!getValues('findyHelp').length;

  const handleUpdateSurvey: SubmitHandler<any> = async (values, event) => {
    event?.preventDefault();

    setActiveSubmit(true);
    const personalData = localStorage.getItem('@Findy:surveyPersonalData')
      ? JSON.parse(localStorage.getItem('@Findy:surveyPersonalData') as string)
      : null;
    const marketData = localStorage.getItem('@Findy:surveyMarketData')
      ? JSON.parse(localStorage.getItem('@Findy:surveyMarketData') as string)
      : null;
    const professionalData = localStorage.getItem('@Findy:surveyProfissionalAreaData')
      ? JSON.parse(localStorage.getItem('@Findy:surveyProfissionalAreaData') as string)
      : null;
    const professionalAchie = localStorage.getItem('@Findy:surveyProfessionalAchievement')
      ? JSON.parse(localStorage.getItem('@Findy:surveyProfessionalAchievement') as string)
      : null;

    const newPersonalData: SurveyPersonalData = {
      ...personalData,
      residencePlace: personalData.residencePlace.split(' - ')[0],
      state: personalData.residencePlace.split(' - ')[1],
      country: personalData.residencePlace.split(' - ')[2],
    };
    try {
      const response = await createSurveyDetails(newPersonalData);
      const response2 = await createSurveyMarketInformation(marketData);
      const response3 = await createProfessionalSituation(professionalData);
      const response4 = await createFeelings(professionalAchie);
      const response5 = await createNeeds({
        principalDifficulties: values.principalDifficulties,
        findyHelp: values.findyHelp,
      });
      const { sub } = jwt_decode<any>(getToken());

      await compliteSurvey(+sub, {
        completeSurvey: true,
      });

      setTimeout(() => {
        setFinishiedSurvey(true);
        navigate('/dashboard');
        localStorage.clear();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="mx-auto mb-[7.692rem] mt-[2rem] w-[66rem]"
      onSubmit={handleSubmit(handleUpdateSurvey)}
    >
      <Heading type="xxs" className="mb-[1rem] text-center text-grey-#4">
        Identificação das necessidades.
      </Heading>

      <fieldset
        className={`flex w-full flex-col rounded-[2.233rem] bg-white py-16 pl-[7.7rem] pr-[7.8rem]`}
      >
        <div className="mb-[1rem]">
          <Heading
            type="xl"
            className={
              errors.principalDifficulties?.message
                ? 'mt-[2rem] text-left text-red'
                : 'mt-[2rem] text-left text-[#000000]'
            }
          >
            Quais são as principais dificuldades que você enfrenta para alcançar seus
            objetivos profissionais?*
          </Heading>
          <span
            className={
              errors.principalDifficulties?.message
                ? 'mb-[2rem] text-[1.2rem] text-[red]'
                : 'mb-[2rem] text-[1.2rem] text-[#000000CC]'
            }
          >
            *Campo obrigatório
          </span>

          <ul className="mt-[2rem]">
            {principalDifficulties.map((item, index) => (
              <li key={index} className="flex gap-[0.6rem]">
                <div
                  className={
                    errors.principalDifficulties
                      ? 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                      : 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                  }
                >
                  <input
                    id={'dificult' + index}
                    className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                    type="checkbox"
                    value={item}
                    {...register('principalDifficulties', {
                      onChange: (event) => {
                        setCheckboxData(event.target.checked);
                        if (!wasTriggered && getValues('findyHelp').length) {
                          trigger('principalDifficulties');
                          setWasTriggered(true);
                        }
                      },
                    })}
                  />
                </div>
                <label
                  htmlFor={'dificult' + index}
                  id={item}
                  className="text-[1.6rem] font-medium text-[#000]"
                >
                  {item}
                </label>
              </li>
            ))}
          </ul>

          <Heading
            type="xl"
            className={
              errors.findyHelp
                ? 'mt-[2rem] text-left text-red'
                : 'mt-[2rem] text-left text-[#000000]'
            }
          >
            Como você espera que a Findy ajude em seu desenvolvimento profissional?*
          </Heading>
          <span
            className={
              errors.findyHelp
                ? 'mb-[2rem] text-[1.2rem] text-[red]'
                : 'mb-[2rem] text-[1.2rem] text-[#000000CC]'
            }
          >
            *Campo obrigatório
          </span>

          <ul className="mt-[2rem]">
            {findyHelp.map((item, index) => (
              <li key={index} className="flex gap-[0.6rem]">
                <div
                  className={
                    errors.findyHelp
                      ? 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-red mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                      : 'relative h-[2.0rem] w-[2.0rem] rounded-[0.514rem] border-[0.257rem] border-green-medium mbl:flex  mbl:h-[2.1rem] mbl:w-[2.24rem] mbl:items-center mbl:justify-center'
                  }
                >
                  <input
                    className="h-[1.73rem] w-[1.7rem] accent-green-medium mbl:h-[1.9rem] mbl:w-[1.9rem]"
                    type="checkbox"
                    id={item}
                    value={item}
                    {...register('findyHelp', {
                      onChange: (event) => {
                        setCheckboxData(event.target.checked);
                        if (!wasTriggered && getValues('principalDifficulties').length) {
                          trigger('findyHelp');
                          setWasTriggered(true);
                        }
                      },
                    })}
                  />
                </div>
                <label htmlFor={item} className="text-[1.6rem] font-medium text-[#000]">
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </fieldset>

      <SurveyNav
        isSubmitting={isSubmitting}
        disabledSubmitting={!fieldsFilled}
        prevStep={prevStep}
        submitLabel="Salvar e sair"
      />
    </form>
  );
}
