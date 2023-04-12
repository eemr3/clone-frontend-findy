import { useState } from "react";

import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

import { InputDB } from "../../components/forms/InputDB";

import { Button } from "../../components/Button";
import { Checkbox } from "../../components/forms/Checkbox";
import { ClockIcon } from "../../components/icons/ClockIcon";
import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";

export function Profile() {
  // Teste de Error no nome e e-mail
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

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
          onSubmit={undefined}
        >
          <div className="grid grid-cols-2 gap-y-[6.469rem]">
            <InputDB
              icon={<PencilIcon />}
              label="Nome completo"
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
              error={errorName}
              onBlur={(e) => {
                setErrorName(
                  e.currentTarget.value.length < 4
                    ? "Nome precisa de ter no mínimo 4 caracteres"
                    : ""
                );
              }}
            />

            <InputDB
              icon={<TelephoneIcon />}
              label="Insira o seu número do WhatsApp"
              placeholder="Ex: (99) 99999-9999"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
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
                setErrorEmail(
                  e.currentTarget.value.match(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                  ) == null
                    ? "E-mail inválido"
                    : ""
                );
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

          <fieldset className="mt-[8rem]">
            <legend className="text-[2.4rem] font-medium leading-[2.813rem] tracking-[-0.5%] text-grey-#1">
              Qual a sua área de atuação?
            </legend>

            <div className="mt-[3.8rem] grid grid-cols-2 gap-y-[2.5rem]">
              <Checkbox
                name="area"
                id="front"
                label="Desenvolvedor Front-End"
              />

              <Checkbox name="area" id="SM" label="Agilistas - Scrum Master" />

              <Checkbox name="area" id="Back" label="Desenvolvedor Back-End" />

              <Checkbox
                name="area"
                id="UX"
                label="UX (Designer, Research, Writer)"
              />

              <Checkbox name="area" id="QA" label="QA" />

              <Checkbox name="area" id="UI" label="UI" />

              <Checkbox name="area" id="DevOps" label="DevOps" />

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
              <Checkbox name="area" id="Outro" label="Outro: " />

              <InputDB placeholder="Cargo" fieldSetClassName="h-[6rem]" />
            </div>
          </fieldset>

          <InputDB
            label="Quais seus interesses na sua área de atuação?"
            placeholder="Ex.: Área de Dados - “Cientista de dados”, “Analista de dados”, etc..."
            fieldSetClassName="mt-[8rem] w-[111.6rem] gap-[3.2rem] w-[20rem]"
            wantInputWidthFull
          />

          <Button
            className="mt-[6.4rem] h-[5.7rem] w-[32.9rem] text-[2.4rem] font-semibold leading-[2.4rem]"
            fill
          >
            SALVAR PERFIL
          </Button>
        </form>
      </section>
    </div>
  );
}
