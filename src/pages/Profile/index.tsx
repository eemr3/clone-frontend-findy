import jwt_decode from 'jwt-decode';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CandidateProfile } from '../../types/CandidateProfile';
import { Role } from '../../types/Role';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Checkbox } from '../../components/forms/Checkbox';
import { InputDB } from '../../components/forms/InputDB';
import { TextErrorMessage } from '../../components/forms/TextErrorMessage';
import { ClockIcon } from '../../components/icons/ClockIcon';
import { EnvelopeIcon } from '../../components/icons/EnvelopeIcon';
import { PencilIcon } from '../../components/icons/PencilIcon';
import { SocialMediaIcon } from '../../components/icons/SocialMediaIcon';
import { TelephoneIcon } from '../../components/icons/TelephoneIcon';

import { AuthContext } from '../../context/auth';
import { getCandidateUser, getPositions, updateProfile } from '../../services/api';
import { getErrorMessage } from '../../utils/ErrorMessageUtil';

type ProfileFormValues = CandidateProfile & {
  name: string;
  email: string;
  phone: string;
};

const schema = yup
  .object()
  .shape(
    {
      name: yup.string().required('Nome obrigatório'),
      phone: yup
        .string()
        .required('Número do Whatsapp obrigatório')
        .min(14, 'Número de Whatsapp inválido'),
      /* 
    .matches(/^[0-9]+$/, "Este campo deve conter apenas números") */
      urlLinkedin: yup
        .string()
        .required('Endereço do Linkedin obrigatório')
        .url('Endereço do Linkedin inválido'),
      email: yup
        .string()
        .required('Endereço de e-mail obrigatório')
        .email('Endereço de e-mail inválido'),
      availableTime: yup.string().required('Tempo de disponibilidade obrigatório'),
      /* occupationArea: yup.array(yup.string()).min(1, "Precisa escolher pelo menos uma área de atuação"), */
      occupationArea: yup.array(yup.string()).when('others', {
        is: (others: string[]) => !others.length,
        then: (schema) =>
          schema.min(1, 'Precisa escolher pelo menos uma área de atuação'),
      }),
      others: yup.array(yup.string()).when('occupationArea', {
        is: (occupationArea: string[]) =>
          occupationArea && occupationArea.includes('Outro'),
        then: (schema) =>
          schema.min(1, 'Precisa informar pelo menos uma área de atuação'),
      }),
      areaOfInterest: yup
        .string()
        .required('Interesse na sua área de atuação obrigatória'),
    },
    [['others', 'occupationArea']],
  )
  .required();

export function Profile() {
  // Teste de Error no nome e e-mail
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [occupations, setOccupations] = useState<Role[]>([]);
  const [candidateUser, setCandidateUser] = useState<any>();
  const [others, setOthers] = useState('');
  /* const [othersArray, setOthersArray] = useState<string[]>([]); */
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<ProfileFormValues>({
    shouldFocusError: true,
    mode: 'onBlur',
    defaultValues: {
      occupationArea: [],
      name: candidateUser ? candidateUser.name : '',
      email: candidateUser ? candidateUser.email : '',
      others: [],
      othersName: [],
    },
  });

  const [disableOtherDescription, setDisableOtherDescription] = useState(true);
  const handleUpdateProfile: SubmitHandler<ProfileFormValues> = async (values, event) => {
    event?.preventDefault();
    setActiveSubmit(true);
    values.description = `${values.name}'s Profile`;
    values.profileSkills = [1];
    try {
      const { ...newValues } = values;

      const body = {
        ...newValues,
      };

      const response = await updateProfile(body);
      toast.success(getErrorMessage(response));

      if (response?.status === 201) {
        navigate('/project');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }

    setActiveSubmit(false);
  };

  useEffect(() => {
    async function fetchData() {
      const pos = await getPositions();

      setOccupations(pos.data);

      const token = getToken();
      const { sub }: any = jwt_decode(token);

      const user = await getCandidateUser(sub);
      setCandidateUser(user.data);
    }
    fetchData();
  }, []);

  function handleOthersInputChange(e: ChangeEvent<HTMLInputElement> | string) {
    const inputValue = typeof e === 'string' ? e : e.target.value;
    setOthers(inputValue);
    /* const othersArray = inputValue.split(",").map((item) => item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
    setOthersArray(othersArray); */
  }

  useEffect(() => {
    if (!candidateUser) return;

    setValue('name', candidateUser?.name);
    setValue('email', candidateUser?.email);
    setValue('candidateUserId', candidateUser?.id);
    /* setValue("others", othersArray) */
  }, [candidateUser /* , othersArray */]);

  useEffect(() => {
    const newOthersArray = !others.trim().length
      ? []
      : others
          .split(',')
          .map((item) => item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
    setValue('others', newOthersArray);

    trigger('others');
  }, [others]);

  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark">
      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5 lg:ml-[4rem] mbl:ml-[2rem]">
        <Heading type="lg-leading58" className="mbl:text-[4rem]">
          Seu perfil
        </Heading>

        <Text type="md" className="mt-[6.4rem] inline-block mbl:text-[1.8rem]">
          Destaque suas habilidades, experiências e interesses profissionais:
          <br />
          <br />
          Preencha seu perfil e seja encontrado por recrutadores de todo o mundo.
        </Text>
      </article>

      <section className="mt-[10.2rem] bg-grey-#5 ">
        <form
          className="mx-auto mb-[16rem] mt-[7.4rem] w-[112.4rem]"
          noValidate
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="grid grid-cols-2 gap-y-[6.469rem] lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-[5.469rem] lg:px-[4rem] mbl:gap-y-[4rem]  mbl:px-[2rem]  ">
            <InputDB
              icon={<PencilIcon className={'mbl:max-w-[2rem]'} />}
              label="Nome completo"
              readOnly
              placeholder="Nome"
              fieldSetClassName={'even:ml-auto'}
              fieldSetBG={`${
                candidateUser?.name != '' || undefined ? 'bg-[#d3d3d3!important]' : ''
              }`}
              error={errors.name?.message}
              {...register('name')}
            />

            <InputDB
              icon={<TelephoneIcon className={'mbl:max-w-[2rem] '} />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={'ml-auto '}
              error={errors.phone?.message}
              mask="PHONE"
              {...register('phone')}
            />

            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={'even:ml-auto'}
              error={errors.urlLinkedin?.message}
              {...register('urlLinkedin')}
            />

            <InputDB
              icon={<SocialMediaIcon className={'mbl:max-w-[2rem] '} />}
              label="Insira o seu GitHub"
              placeholder="GitHub"
              fieldSetClassName={'ml-auto'}
              {...register('urlGithub')}
            />

            <InputDB
              icon={<EnvelopeIcon className={'mbl:max-w-[2rem] '} />}
              label="Insira o seu email"
              type="email"
              readOnly
              placeholder="Email"
              fieldSetClassName={'even:ml-auto'}
              error={errors.email?.message}
              {...register('email')}
              fieldSetBG={`${
                candidateUser?.email != '' || undefined ? 'bg-[#d3d3d3!important]' : ''
              }`}
            />

            <InputDB
              icon={<ClockIcon className={'mbl:max-w-[2rem] '} />}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={'ml-auto'}
              error={errors.availableTime?.message}
              {...register('availableTime')}
            />
          </div>
          <fieldset className="max-[80%] mb-[6.8rem] mt-[8rem] lg:px-[2rem] mbl:mt-[3rem]">
            <p className=" text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1 md:text-[2rem] mbl:text-[1.5rem] mbl:font-bold">
              Quais áreas você gostaria de atuar?
            </p>

            {!!errors.occupationArea?.message && disableOtherDescription && (
              <TextErrorMessage
                errorMessage={errors.occupationArea?.message}
                className="mt-[1.2rem] inline-block"
              />
            )}

            <div className="mt-[3.8rem] grid grid-cols-2 gap-y-[2.5rem]">
              {occupations?.map((occupation) => (
                <Checkbox
                  key={occupation.id}
                  id={String(occupation.id)}
                  label={occupation.title}
                  value={occupation.title}
                  {...register('occupationArea')}
                />
              ))}
            </div>

            {/* <div className="mt-[2.5rem] flex items-start items-center items-baseline gap-16 mbl:flex-col "> */}
            <div className="mt-[2.5rem] flex gap-16 mbl:flex-col ">
              <Checkbox
                id="10"
                labelClassName={errors.others?.message?.length ? 'mb-[4.4rem]' : ''}
                label="Outro:"
                value="Outro"
                {...register('occupationArea', {
                  onChange: (event) => {
                    setDisableOtherDescription(!event.currentTarget.checked);
                    if (!event.currentTarget.checked && getValues().others.length > 0)
                      setOthers('');
                  },
                })}

                /* onChange={(event) => {
              setDisableOtherDescription(!event.currentTarget.checked);
              if (!event.currentTarget.checked &&
                getValues().others.length > 0)
                setOthers("");
            }} */
              />

              <InputDB
                placeholder="'Tech Lead','Gestor'"
                value={others}
                disabled={disableOtherDescription}
                /* {...register("others")} */
                error={errors.others?.message}
                onChange={(e) => handleOthersInputChange(e)}
              />
            </div>
          </fieldset>

          <div>
            <InputDB
              label="Quais seus interesses na sua área de atuação?"
              placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
              fieldSetClassName="mt-[8rem] w-[111.6rem] [&>*:nth-child(1)]:mb-[2rem] mbl:px-[2rem] mbl:mt-[0] w-[auto]"
              wantInputWidthFull
              error={errors.areaOfInterest?.message}
              {...register('areaOfInterest')}
              type="textarea"
            />

            <Button
              type="submit"
              className="mt-[6.4rem] h-[5.7rem] w-[32.9rem] text-[2.4rem] font-semibold leading-[2.4rem] lg:ml-[2rem] mbl:mt-[4rem] mbl:h-[3rem] mbl:max-w-[13.9rem] mbl:text-[1.4rem]"
              fill
              disabled={activeSubmit}
            >
              SALVAR PERFIL
            </Button>
          </div>
        </form>
      </section>

      {/* <div className="flex flex-col gap-4 ml-[100px]">
        <h1 className="text-[30px] font-black">ERROR</h1>
        <pre>
          {
            Object.keys(errors).map((key, index) => (
              key
            ))

            /* JSON.stringify(errors, null, 2) /
          }
        </pre>
        </div> */}
    </div>
  );
}
