import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";

import { InputDB } from "../../components/forms/InputDB";
import { SelectDB } from "../../components/forms/SelectDB";
import { Checkbox } from "../../components/forms/Checkbox";

import { ClockIcon } from "../../components/icons/ClockIcon";
import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";
import api, { getCandidateUser, getCandidatesProfiles, getCandidatesUsers, getPositions, updateProfile } from "../../services/api";
import { Role } from "../../types/Role";
import { TextErrorMessage } from "../../components/forms/TextErrorMessage";
import { CandidateUser } from "../../types/CandidateUser";
import { CandidateProfile } from "../../types/CandidateProfile";

type ProfileFormValues = CandidateProfile & {
  name: string;
  email: string;
  otherDescription: string;
}

/* {
  nome: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  email: string;
  disponibilidadeSemanal: string;
  areaAtuacao: string[];
  areaOutroCargo: string;
  interesseAreaAtuacao: string;
}
 */
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Nome obrigatório"),
    phone: yup.string().required("Número do Whatsapp obrigatório"),
    urlLinkedin: yup.string().required("Endereço do Linkedin obrigatório").url("Endereço do Linkedin inválido"),
    urlGithub: yup.string().required("Endereço do Github obrigatório").url("Endereço do Github inválido"),
    email: yup.string().required("Endereço de e-mail obrigatório").email("Endereço de e-mail inválido"),
    availableTime: yup.string().required("Tempo de disponibilidade obrigatório"),
    /* occupationArea: yup.array(yup.string()).min(1, "Precisa escolher pelo menos uma área de atuação"), */
    occupationArea: yup.array(yup.string()).when('others', {
      is: (others: string[]) => !others.length,
      then: (schema) => schema.min(1, "Precisa escolher pelo menos uma área de atuação")
    }),
    others: yup.array(yup.string()),
    otherDescription: yup.string().when("others", {
      is: (others: string[]) => others.length,
      then: (schema) => schema.required("Cargo obrigatório")
    }),

    /* .when('others', {
      is: (other: string[]) => !!other && !other.length,
      then: (schema) => schema.required("Cargo obrigatório")
    }), */

    /* others: yup.array(yup.string()).when('occupationArea', {
      is: (area: string[]) => !!area && area.indexOf('Outro') > -1,
      then: (schema) => schema.required("Cargo obrigatório")
    }), */

    areaOfInterest: yup.string().required("Interesse na sua área de atuação obrigatória"),
  }).required();


/* .shape({
  nome: yup.string().required("Nome obrigatório"),
  whatsapp: yup.string().required("Número do Whatsapp obrigatório"),
  linkedin: yup.string().required("Endereço do Linkedin obrigatório").url("Endereço do Linkedin inválido"),
  github: yup.string().required("Endereço do Github obrigatório").url("Endereço do Github inválido"),
  email: yup.string().required("Endereço de e-mail obrigatório").email("Endereço de e-mail inválido"),
  disponibilidadeSemanal: yup.string().required("Tempo de disponibilidade obrigatório"),
  areaAtuacao: yup.array(yup.string()).min(1, "Precisa escolher pelo menos uma área de atuação"),
  areaOutroCargo: yup.string().when('areaAtuacao', {
    is: (area: string[]) => !!area && area.indexOf('Outro') > -1,
    then: (schema) => schema.required("Cargo obrigatório")
  }),

  interesseAreaAtuacao: yup.string().required("Interesse na sua área de atuação obrigatória"),
}).required(); */


export function Profile() {
  // Teste de Error no nome e e-mail

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    defaultValues: {
      occupationArea: [],
      others: []
    }
  });


  const [activeSubmit, setActiveSubmit] = useState(false);
  const [occupations, setOccupations] = useState<Role[]>([]);
  const [candidateUser, setCandidateUser] = useState<CandidateUser | null>(null);
  const [disableOtherDescription, setDisableOtherDescription] = useState(true);

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  const handleUpdateProfile: SubmitHandler<ProfileFormValues> = async (values, event) => {
    event?.preventDefault();
    setActiveSubmit(true);

    /* await new Promise(resolve => setTimeout(resolve, 3000)) */

    // handle data that is not in the form
    values.description = `Profile ${values.description}`;
    values.profileSkills = [1];

    try {
      const { otherDescription, ...newValues } = values;

      const body = {
        ...newValues,
        others: [otherDescription]
      }

      console.log("Dados do Formulário: ", body);

      await updateProfile(body);
    } catch (error) {
      console.log("Erro ao atualizar Perfil: ", error)
    }

    setActiveSubmit(false);

  }

  useEffect(() => {
    async function fetchData() {
      const pos = await getPositions();

      setOccupations(pos.data);
      console.log(pos);

      const user = await getCandidateUser("23");
      setCandidateUser(user.data);
      console.log("user: ", user);

      const profiles = await getCandidatesProfiles();
      console.log("Candidates Profiles:", profiles);

    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!candidateUser)
      return

    setValue('name', candidateUser.name);
    setValue('email', candidateUser.email);
    setValue('candidateUserId', candidateUser.id);
  }, [candidateUser])


  useEffect(() => {
    console.log("React Hook Form[Errors]: ", errors);
  }, [errors])

  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark">
      <HeaderProfile />

      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5">
        <Heading type="lg-leading58">Seu perfil</Heading>

        <Text type="md" className="mt-[6.4rem] inline-block">
          Destaque suas habilidades, experiências e interesses profissionais:
          <br />
          <br />
          Preencha seu perfil e seja encontrado por recrutadores de todo o
          mundo.
        </Text>
      </article>

      <section className="mt-[10.2rem] bg-grey-#5 ">
        <form
          className="mx-auto mb-[16rem] mt-[7.4rem] w-[112.4rem]"
          noValidate
          onSubmit={handleSubmit(handleUpdateProfile)}
        >
          <div className="grid grid-cols-2 gap-y-[6.469rem]">
            <InputDB
              icon={<PencilIcon />}
              label="Nome completo"
              readOnly
              /* placeholder="Nome" */
              fieldSetClassName={"even:ml-auto"}
              error={errors.name?.message}
              {...register("name")}
            />

            <InputDB
              icon={<TelephoneIcon />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={"even:ml-auto"}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
              error={errors.urlLinkedin?.message}
              {...register("urlLinkedin")}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu GitHub"
              placeholder="GitHub"
              fieldSetClassName={"even:ml-auto"}
              error={errors.urlGithub?.message}
              {...register("urlGithub")}
            />

            <InputDB
              icon={<EnvelopeIcon />}
              label="Insira o seu email"
              type="email"
              readOnly
              /* placeholder="Email" */
              fieldSetClassName={"even:ml-auto"}
              error={errors.email?.message}
              {...register("email")}
            />

            <InputDB
              icon={<ClockIcon />}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={"even:ml-auto"}
              error={errors.availableTime?.message}
              {...register("availableTime")}
            />

            {/* <SelectDB
              icon={<ClockIcon />}
              options={timeToWeek}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={"even:ml-auto"}
              whenListIsEmpty="disabled"
            /> */}
          </div>

          <fieldset className="mt-[8rem]">
            <legend className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1">
              Qual a sua área de atuação?
            </legend>

            {!!errors.occupationArea?.message && disableOtherDescription &&
              <TextErrorMessage
                errorMessage={errors.occupationArea?.message}
                className="inline-block mt-[1.2rem]"
              />

              /* <Text
                type="md"
                className="inline-block mt-[1.2rem] text-[1.8rem] text-red font-bold leading-[1.924rem]"
              >
                {`${errors.areaAtuacao?.message}`}
              </Text> */

            }

            <div className="mt-[3.8rem] grid grid-cols-2 gap-y-[2.5rem]">

              {occupations?.map(occupation => (
                <Checkbox
                  key={occupation.id}
                  id={String(occupation.id)}
                  label={occupation.title}
                  value={occupation.title}
                  {...register("occupationArea")}
                />
              ))}

            </div>


            <div className="mt-[2.5rem] flex gap-16">
              <Checkbox
                id={occupations?.length ? String(occupations.length + 1) : "1"}
                label="Outro: "
                value={"others"}
                labelClassName="mt-[1.315rem] h-fit"
                {...register("others")}
                onChange={(event) => {
                  setDisableOtherDescription(!event.currentTarget.checked);
                  if (!event.currentTarget.checked &&
                    getValues().otherDescription.length > 0)
                    setValue("otherDescription", "");
                  /* setValue("others", []); */
                }}
              />

              <InputDB
                placeholder="Cargo"
                disabled={disableOtherDescription}
                /* value={otherDescription} */
                error={disableOtherDescription ? "" : errors.otherDescription?.message  /* errors.others?.message */}
                {...register("otherDescription")}
              /* {...register("others")} */
              /* onChange={(event) => setOtherDescription(event.currentTarget.value)} */
              />

            </div>
          </fieldset>

          <InputDB
            label="Quais seus interesses na sua área de atuação?"
            placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
            fieldSetClassName="mt-[8rem] w-[111.6rem] [&>*:nth-child(1)]:mb-[2rem]"
            wantInputWidthFull
            error={errors.areaOfInterest?.message}
            {...register("areaOfInterest")}
          />

          <Button
            type="submit"
            className="mt-[6.4rem] h-[5.7rem] w-[32.9rem] text-[2.4rem] font-semibold leading-[2.4rem]"
            fill
            disabled={activeSubmit}
          >
            SALVAR PERFIL
          </Button>
        </form>

        <div className="flex flex-col gap-4 ml-[100px]">
          <h1 className="text-[30px] font-black">ERROR</h1>
          <pre>
            {/* JSON.stringify(errors, null, 2) */}
          </pre>
        </div>
      </section>
    </div>
  );
}
