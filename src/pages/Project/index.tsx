import { useState } from "react";

import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

import { InputDB } from "../../components/forms/InputDB";

import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";

export function Project() {
  // Teste de Error no nome e e-mail
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const timeToWeek = new Array(20)
    .fill(null)
    .map((item, index) => `${String((index + 1) * 2).padStart(2, "0")} horas`);

  return (
    <div className="w-max-[144rem] flex flex-col bg-blue-dark ">
      <HeaderProfile />

      <article className="ml-[15.9rem] mt-[6.414rem] text-grey-#5">
        <Heading type="lg-leading58">Novo projeto</Heading>

        <Text type="md" className="mt-[6.4rem] inline-block">
          Preencha o formulário abaixo com todas as informações relevantes
          acerca do projeto.
          <br />
          <br />O formulário será submetido aos administradores da Findy, para
          aprovação. O prazo para devolução é de XX dias.
        </Text>
      </article>

      <section className="mt-[10.2rem] bg-grey-#5">
        <form
          className="mx-auto mb-[16rem] mt-[7.4rem] w-[100%] max-w-[112.4rem]"
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
                    ? "Nome precisa de ter no mínimo 1 caracter "
                    : ""
                );
              }}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o seu LinkedIn"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />
          </div>
          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Escopo"
            >
              Nome completo:{" "}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea className="h-[100%]  w-[100%] resize-none p-[0.6rem] outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-[6.469rem]">
            <InputDB
              icon={<PencilIcon />}
              label="Quais as linguagens de programação e ferramentas que serão utilizadas?"
              placeholder="Ferramentas"
              fieldSetClassName={"even:ml-auto"}
              error={errorName}
              onBlur={(e) => {
                setErrorName(
                  e.currentTarget.value.length < 4
                    ? "Nome precisa de ter no mínimo 1 caracter "
                    : ""
                );
              }}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Data do inicio do projeto"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />
          </div>

          {/**************************************  CHECKBOX ****************************************************/}
          <div className="grid grid-cols-2 gap-y-[6.469rem]">
            <InputDB
              icon={<PencilIcon />}
              label="Insira o nome da pessoa responsável pelo projeto"
              placeholder="Nome"
              fieldSetClassName={"even:ml-auto"}
            />

            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira o contato da pessoa responsável"
              placeholder="Contato"
              fieldSetClassName={"even:ml-auto"}
            />
            <InputDB
              icon={<SocialMediaIcon />}
              label="Data do inicio do projeto"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />
            <InputDB
              icon={<SocialMediaIcon />}
              label="Insira os outros contatos dos responsáveis"
              placeholder="LinkedIn"
              fieldSetClassName={"even:ml-auto"}
            />
          </div>

          <div className="mb-[4rem] mt-[4rem] flex w-[100%] flex-col gap-[2rem]">
            <label
              className=" text-[2.4rem]"
              htmlFor="nome_completo "
              placeholder="Deixe sua mensagem"
            >
              Como a Findy pode apoiar o seu projeto?{" "}
            </label>
            <div className=" mt-[3.2rem]flex h-[22.2rem] w-[100%] max-w-[112.4rem] rounded-[0.8rem] border-[0.15rem] border-grey-#1 bg-white p-[1rem]">
              <textarea className="h-[100%]  w-[100%] resize-none p-[0.6rem] outline-none" />
            </div>
          </div>

          <button className="mt-[6.6rem] h-[6rem] w-[60%] max-w-[32.9rem] rounded-[3.2rem] bg-[#01A195]">
            <p className="text-[2.4rem] text-[#FFFFFF] ">SUBMETER PROJETO</p>
          </button>
        </form>
      </section>
    </div>
  );
}
