import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

import { Checkbox } from "../../components/forms/Checkbox";
import { InputDB } from "../../components/forms/InputDB";

import { TextErrorMessage } from "../../components/forms/TextErrorMessage";
import { ClockIcon } from "../../components/icons/ClockIcon";
import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";
import { getPositions } from "../../services/api";
import { Role } from "../../types/Role";

type ProfileFormValues = {
  nome: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  email: string;
  disponibilidadeSemanal: string;
  areaAtuacao: string[];
  areaOutroCargo: string;
  interesseAreaAtuacao: string;
};

const schema = yup
  .object()
  .shape({
    nome: yup.string().required("Nome obrigatório"),
    whatsapp: yup.string().required("Número do Whatsapp obrigatório"),
    linkedin: yup
      .string()
      .required("Endereço do Linkedin obrigatório")
      .url("Endereço do Linkedin inválido"),
    github: yup
      .string()
      .required("Endereço do Github obrigatório")
      .url("Endereço do Github inválido"),
    email: yup
      .string()
      .required("Endereço de e-mail obrigatório")
      .email("Endereço de e-mail inválido"),
    disponibilidadeSemanal: yup
      .string()
      .required("Tempo de disponibilidade obrigatório"),
    areaAtuacao: yup
      .array(yup.string())
      .min(1, "Precisa escolher pelo menos uma área de atuação."),
    areaOutroCargo: yup.string().when("areaAtuacao", {
      is: (area: string[]) => !!area && area.indexOf("Outro") > -1,
      then: (schema) => schema.required("Cargo obrigatório"),
    }),

    interesseAreaAtuacao: yup
      .string()
      .required("Interesse na sua área de atuação obrigatória"),
  })
  .required();

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
      areaAtuacao: [],
    },
  });

  /* const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
 */
  const [occupations, setOccupations] = useState<Role[]>([]);
  const [disableOtherDescription, setDisableOtherDescription] = useState(true);

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  const handleUpdateProfile: SubmitHandler<ProfileFormValues> = async (
    values,
    event
  ) => {
    event?.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.log("Dados do Formulário: ", values);
  };

  useEffect(() => {
    async function fetchData() {
      const pos = await getPositions();

      setOccupations(pos.data);
      console.log(pos);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("React Hook Form[Errors]: ", errors);
  }, [errors]);

  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark">
      <HeaderProfile />

      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5 lg:ml-[4rem] mbl:ml-[2rem]">
        <Heading type="lg-leading58" className="mbl:text-[4rem]">Seu perfil</Heading>

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
          <div className="grid grid-cols-2 gap-y-[6.469rem] lg:flex lg:flex-col lg:items-start lg:justify-center lg:gap-y-[6.469rem] lg:px-[4rem] mbl:px-[2rem]">
            <InputDB
              icon={<PencilIcon />}
              label="Nome completo"
              placeholder="Nome"
              error={errors.nome?.message}
              {...register("nome")}
              /* error={errorName} */
              onBlur={(e) => {
                /* setErrorName(
                  e.currentTarget.value.length < 4
                    ? "Nome precisa de ter no mínimo 4 caracteres"
                    : ""
                ); */
              }}
            />

            <InputDB
              icon={<TelephoneIcon />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={"ml-auto"}
              error={errors.whatsapp?.message}
              {...register("whatsapp")}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
              error={errors.linkedin?.message}
              {...register("linkedin")}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu GitHub"
              placeholder="GitHub"
              fieldSetClassName={"ml-auto"}
              error={errors.github?.message}
              {...register("github")}
            />

            <InputDB
              icon={<EnvelopeIcon />}
              label="Insira o seu email"
              type="email"
              placeholder="Email"
              fieldSetClassName={"even:ml-auto"}
              error={errors.email?.message}
              {...register("email")}
            />

            <InputDB
              icon={<ClockIcon />}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={"ml-auto"}
              error={errors.disponibilidadeSemanal?.message}
              {...register("disponibilidadeSemanal")}
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

          <fieldset className="max-[80%] mb-[6.8rem] mt-[8rem] lg:px-[2rem]">
            <legend className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1">
              Quais cargos serão oferecidos à equipe do projeto?
            </legend>

            {!!errors.areaAtuacao?.message && (
              <TextErrorMessage
                errorMessage={errors.areaAtuacao?.message}
                className="mt-[1.2rem] inline-block"
              />
            )}
            
            <div className="mt-[4rem] grid  grid-cols-2 gap-y-[2.5rem] mbl:mt-[3.8rem] mbl:w-[86%] md:grid-cols-1">
              {occupations?.map((occupation: any) => (
                <Checkbox
                  key={occupation.id}
                  id={String(occupation.id)}
                  label={occupation.title}
                  value={occupation.title}
                  {...register("areaAtuacao")}
                />
              ))}
            </div>
            <div className="mt-[2.5rem] flex items-start items-center items-baseline gap-16 mbl:flex-col">
              <Checkbox name="area" id="Outro" label="Outro: " />

              <InputDB placeholder="Cargo" fieldSetClassName="h-[6rem]" />
            </div>
          </fieldset>


          <InputDB
            label="Quais seus interesses na sua área de atuação?"
            placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
            fieldSetClassName="mt-[8rem] w-[111.6rem] [&>*:nth-child(1)]:mb-[2rem] lg:px-[2rem]"
            error={errors.interesseAreaAtuacao?.message}
            {...register("interesseAreaAtuacao")}
          />

          <Button
            type="submit"
            className="mt-[6.4rem] h-[5.7rem] w-[32.9rem] text-[2.4rem] font-semibold leading-[2.4rem] lg:ml-[2rem]"
            fill
          >
            SALVAR PERFIL
          </Button>
        </form>
      </section>
    </div>
  );
}
