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
import { getPositions } from "../../services/api";
import { Role } from "../../types/Role";
import { TextErrorMessage } from "../../components/forms/TextErrorMessage";

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
}

const schema = yup
  .object()
  .shape({
    nome: yup.string().required("Nome obrigatório"),
    whatsapp: yup.string().required("Número do Whatsapp obrigatório"),
    linkedin: yup.string().required("Endereço do Linkedin obrigatório").url("Endereço do Linkedin inválido"),
    github: yup.string().required("Endereço do Github obrigatório").url("Endereço do Github inválido"),
    email: yup.string().required("Endereço de e-mail obrigatório").email("Endereço de e-mail inválido"),
    disponibilidadeSemanal: yup.string().required("Tempo de disponibilidade obrigatório"),
    areaAtuacao: yup.array(yup.string()).min(1, "Precisa escolher pelo menos uma área de atuação."),
    areaOutroCargo: yup.string().when('areaAtuacao', {
      is: (area: string[]) => !!area && area.indexOf('Outro') > -1,
      then: (schema) => schema.required("Cargo obrigatório")
    }),

    interesseAreaAtuacao: yup.string().required("Interesse na sua área de atuação obrigatória"),
  }).required();


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
      areaAtuacao: []
    }
  });

  /* const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
 */
  const [occupations, setOccupations] = useState<Role[]>([]);
  const [disableOtherDescription, setDisableOtherDescription] = useState(true);

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  const handleUpdateProfile: SubmitHandler<ProfileFormValues> = async (values, event) => {
    event?.preventDefault()
    await new Promise(resolve => setTimeout(resolve, 600))

    console.log("Dados do Formulário: ", values);
  }

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
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
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
              fieldSetClassName={"even:ml-auto"}
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
              fieldSetClassName={"even:ml-auto"}
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
              fieldSetClassName={"even:ml-auto"}
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

          <fieldset className="mt-[8rem]">
            <legend className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1">
              Qual a sua área de atuação?
            </legend>

            {!!errors.areaAtuacao?.message &&
              <TextErrorMessage
                errorMessage={errors.areaAtuacao?.message}
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
                  {...register("areaAtuacao")}
                />
              ))}

            </div>


            <div className="mt-[2.5rem] flex gap-16">
              <Checkbox
                id={occupations?.length ? String(occupations.length + 1) : "1"}
                label="Outro: "
                value={"Outro"}
                labelClassName="mt-[1.315rem] h-fit"
                {...register("areaAtuacao")}
                onChange={(event) => {
                  setDisableOtherDescription(!event.currentTarget.checked);
                  if (!event.currentTarget.checked &&
                    getValues().areaOutroCargo.length > 0)
                    setValue("areaOutroCargo", "");
                }}
              />

              <InputDB
                placeholder="Cargo"
                disabled={disableOtherDescription}
                error={disableOtherDescription ? "" : errors.areaOutroCargo?.message}
                {...register("areaOutroCargo")}
              />

            </div>
          </fieldset>

          <InputDB
            label="Quais seus interesses na sua área de atuação?"
            placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
            fieldSetClassName="mt-[8rem] w-[111.6rem] [&>*:nth-child(1)]:mb-[2rem]"
            wantInputWidthFull
            error={errors.interesseAreaAtuacao?.message}
            {...register("interesseAreaAtuacao")}
          />

          <Button
            type="submit"
            className="mt-[6.4rem] h-[5.7rem] w-[32.9rem] text-[2.4rem] font-semibold leading-[2.4rem]"
            fill
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
