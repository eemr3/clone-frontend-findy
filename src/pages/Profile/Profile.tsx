import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

import jwt_decode from "jwt-decode";
import { Checkbox } from "../../components/forms/Checkbox";
import { InputDB } from "../../components/forms/InputDB";
import { TextErrorMessage } from "../../components/forms/TextErrorMessage";
import { ClockIcon } from "../../components/icons/ClockIcon";
import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";

import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Header } from "../../components/Header";
import {
  getCandidateUser,
  getPositions,
  updateProfile,
} from "../../services/api";
import { CandidateProfile } from "../../types/CandidateProfile";
import { Role } from "../../types/Role";

type ProfileFormValues = CandidateProfile & {
  name: string;
  email: string;
  phone: string;
  otherDescription: string;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Nome obrigatório"),
    phone: yup.string().required("Número do Whatsapp obrigatório"),
    urlLinkedin: yup
      .string()
      .required("Endereço do Linkedin obrigatório")
      .url("Endereço do Linkedin inválido"),
    urlGithub: yup
      .string()
      .required("Endereço do Github obrigatório")
      .url("Endereço do Github inválido"),
    email: yup
      .string()
      .required("Endereço de e-mail obrigatório")
      .email("Endereço de e-mail inválido"),
    availableTime: yup
      .string()
      .required("Tempo de disponibilidade obrigatório"),
    /* occupationArea: yup.array(yup.string()).min(1, "Precisa escolher pelo menos uma área de atuação"), */
    occupationArea: yup.array(yup.string()).when("others", {
      is: (others: string[]) => !others.length,
      then: (schema) =>
        schema.min(1, "Precisa escolher pelo menos uma área de atuação"),
    }),
    others: yup.array(yup.string()),
    otherDescription: yup.string().when("others", {
      is: (others: string[]) => others.length,
      then: (schema) => schema.required("Cargo obrigatório"),
    }),

    /* .when('others', {
      is: (other: string[]) => !!other && !other.length,
      then: (schema) => schema.required("Cargo obrigatório")
    }), */

    /* others: yup.array(yup.string()).when('occupationArea', {
      is: (area: string[]) => !!area && area.indexOf('Outro') > -1,
      then: (schema) => schema.required("Cargo obrigatório")
    }), */

    areaOfInterest: yup
      .string()
      .required("Interesse na sua área de atuação obrigatória"),
  })
  .required();

export function Profile() {
  // Teste de Error no nome e e-mail
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [occupations, setOccupations] = useState<Role[]>([]);
  const [candidateUser, setCandidateUser] = useState<any>();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    defaultValues: {
      occupationArea: [],
      name: candidateUser ? candidateUser.name : "",
      email: candidateUser ? candidateUser.email : "",
      others: [],
    },
  });

  const [disableOtherDescription, setDisableOtherDescription] = useState(true);

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  const handleUpdateProfile: SubmitHandler<ProfileFormValues> = async (
    values,
    event
  ) => {
    event?.preventDefault();
    setActiveSubmit(true);
    values.description = `Profile ${values.description}`;
    values.profileSkills = [1];

    try {
      const { otherDescription, ...newValues } = values;

      const body = {
        ...newValues,
       
      };
      await updateProfile(body);
    } catch (error) {
   
    }

    setActiveSubmit(false);
  };

  useEffect(() => {
    async function fetchData() {
      const pos = await getPositions();

      setOccupations(pos.data);

      const token: string | any = localStorage.getItem("token");
      const { sub }: any = jwt_decode(token);

      const user = await getCandidateUser(sub);
      setCandidateUser(user.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!candidateUser) return;

    setValue("name", candidateUser.name);
    setValue("email", candidateUser.email);
    setValue("candidateUserId", candidateUser.id);
  }, [candidateUser]);



  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark">
      <Header showJustify={false} />

      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5 lg:ml-[4rem] mbl:ml-[2rem]">
        <Heading type="lg-leading58" className="mbl:text-[4rem]">
          Seu perfil
        </Heading>

        <Text type="md" className="mt-[6.4rem] inline-block mbl:text-[1.8rem]">
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
          <div className="grid grid-cols-2 gap-y-[6.469rem] lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-[5.469rem] lg:px-[4rem] mbl:gap-y-[4rem]  mbl:px-[2rem]  ">
            <InputDB
              icon={<PencilIcon className={"mbl:max-w-[2rem]"} />}
              label="Nome completo"
              readOnly
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
              fieldSetBG={`${
                candidateUser?.name != "" || undefined ? "bg-[#d3d3d3!important]" : ""
              }`}
              error={errors.name?.message}
              {...register("name")}
            />

            <InputDB
              icon={<TelephoneIcon className={"mbl:max-w-[2rem] "} />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={"ml-auto "}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <InputDB
              icon={<SocialMediaIcon className={"mbl:max-w-[2rem] "} />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
              error={errors.urlLinkedin?.message}
              {...register("urlLinkedin")}
            />

            <InputDB
              icon={<SocialMediaIcon className={"mbl:max-w-[2rem] "} />}
              label="Insira o seu GitHub"
              placeholder="GitHub"
              fieldSetClassName={"ml-auto"}
              error={errors.urlGithub?.message}
              {...register("urlGithub")}
            />

            <InputDB
              icon={<EnvelopeIcon className={"mbl:max-w-[2rem] "} />}
              label="Insira o seu email"
              type="email"
              readOnly
              placeholder="Email"
              fieldSetClassName={"even:ml-auto"}
              error={errors.email?.message}
              {...register("email")}
              fieldSetBG={`${
                candidateUser?.name != "" || undefined ? "bg-[#d3d3d3!important]" : ""
              }`}
            />

            <InputDB
              icon={<ClockIcon className={"mbl:max-w-[2rem] "} />}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={"ml-auto"}
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
                  {...register("occupationArea")}
                />
              ))}
            </div>
          </fieldset>

          <div>
            <InputDB
              label="Quais seus interesses na sua área de atuação?"
              placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
              fieldSetClassName="mt-[8rem] w-[111.6rem] [&>*:nth-child(1)]:mb-[2rem] mbl:px-[2rem] mbl:mt-[0]"
              wantInputWidthFull
              error={errors.areaOfInterest?.message}
              {...register("areaOfInterest")}
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
    </div>
  );
}
