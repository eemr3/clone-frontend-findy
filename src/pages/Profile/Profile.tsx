import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";

import { InputDB } from "../../components/forms/InputDB";
import { SelectDB } from "../../components/forms/SelectDB";
import { Checkbox } from "../../components/forms/Checkbox";

import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";
import { ClockIcon } from "../../components/icons/ClockIcon";

const schema = yup
  .object()
  .shape({
    nome: yup.string().required("Nome obrigatório"),
    link_selecao_equipe: yup.string().required("Link seleção equipe obrigatório"),
    escopo_project: yup.string().required("Escopo do projeto obrigatório"),
    farramentas: yup.string().required("Ferramentas obrigatórias"),
    data_inicio: yup.string().required("Data de início obrigatória"),
    responsavel_project: yup.string().required("nome do responsável pelo projeto obrigatório"),
    contato_responsavel: yup.string().required("Contato do responsável obrigatório"),
    linkedin_responsavel: yup.string().url("URL do LinkedIn inválida").required("Linkedin do responsável obrigatório!"),
    contato_outros_responsaveis: yup.string(),
    ajuda_findy: yup.string()
  })
  .required();

interface FormValues {
  nome: string;
  link_selecao_equipe: string;
  escopo_project: string;
  farramentas: string;
  data_inicio: string;
  responsavel_project: string;
  contato_responsavel: string;
  linkedin_responsavel: string;
  contato_outros_responsaveis: string;
  ajuda_findy: string;
}

export function Profile() {
  // Teste de Error no nome e e-mail


  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  /* const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
 */

  const timeToWeek = new Array(20).fill(null).map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark">
      <HeaderProfile />

      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5">
        <Heading
          type="lg-leading58"
        >
          Seu perfil
        </Heading>

        <Text
          type="md"
          className="inline-block mt-[6.4rem]"
        >
          Destaque suas habilidades, experiências e interesses profissionais:
          <br /><br />
          Preencha seu perfil e seja encontrado por recrutadores de todo o mundo.
        </Text>

      </article>



      <section className="mt-[10.2rem] bg-grey-#5 ">

        <form
          className="w-[112.4rem] mt-[7.4rem] mx-auto mb-[16rem]"
          onSubmit={undefined}
        >
          <div className="grid grid-cols-2 gap-y-[6.469rem]">
            <InputDB
              name="name"
              icon={<PencilIcon />}
              label="Nome completo"
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
              error={errorName}
              onBlur={(e) => {
                setErrorName(e.currentTarget.value.length < 4 ?
                  "Nome precisa de ter no mínimo 4 caracteres" : "")
              }
              }
            />

            <InputDB
              name="whatsapp"
              icon={<TelephoneIcon />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
              name="linkedin"
              icon={<SocialMediaIcon />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
              name="github"
              icon={<SocialMediaIcon />}
              label="Insira o seu GitHub"
              placeholder="GitHub"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
              icon={<EnvelopeIcon />}
              label="Insira o seu email"
              type="email"
              placeholder="Email"
              fieldSetClassName={"even:ml-auto"}
              error={errorEmail}
              onBlur={(e) => {
                setErrorEmail(e.currentTarget.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null ?
                  "E-mail inválido" : "");
              }}
            />

            <InputDB
              icon={<ClockIcon />}
              label="Quanto tempo você tem disponível?"
              placeholder="Horas/ semana"
              fieldSetClassName={"even:ml-auto"}
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

          <fieldset
            className="mt-[8rem]"
          >
            <legend className="text-[2.4rem] leading-[2.813rem] tracking-[-0.5%] font-medium text-grey-#1">
              Qual a sua área de atuação?
            </legend>

            <div className="mt-[3.8rem] grid grid-cols-2 gap-y-[2.5rem]">

              <Checkbox
                name="area"
                id="front"
                label="Desenvolvedor Front-End"
              />

              <Checkbox
                name="area"
                id="SM"
                label="Agilistas - Scrum Master"
              />

              <Checkbox
                name="area"
                id="Back"
                label="Desenvolvedor Back-End"
              />

              <Checkbox
                name="area"
                id="UX"
                label="UX (Designer, Research, Writer)"
              />

              <Checkbox
                name="area"
                id="QA"
                label="QA"
              />

              <Checkbox
                name="area"
                id="UI"
                label="UI"
              />

              <Checkbox
                name="area"
                id="DevOps"
                label="DevOps"
              />

              <Checkbox
                name="area"
                id="Mentor"
                label="Mentores - (alguém com experiência guiando o time)"
              />
            </div>

            <Checkbox
              name="area"
              id="APM"
              label="APM - Product Manager"
              labelClassName="mt-[2.5rem]"
            />

            <div className="mt-[2.5rem] flex items-center gap-16">
              <Checkbox
                name="area"
                id="Outro"
                label="Outro: "
              />

              <InputDB
                placeholder="Cargo"
                fieldSetClassName="h-[6rem]"
              />
            </div>

          </fieldset>


          <InputDB
            label="Quais seus interesses na sua área de atuação?"
            placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
            fieldSetClassName="mt-[8rem] w-[111.6rem] gap-[3.2rem]"
            wantInputWidthFull
          />

          <Button
            className="mt-[6.4rem] w-[32.9rem] h-[5.7rem] text-[2.4rem] leading-[2.4rem] font-semibold"
            fill
          >
            SALVAR PERFIL
          </Button>

        </form>
      </section>



    </div>
  );
}