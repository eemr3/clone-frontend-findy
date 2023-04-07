import { useState } from "react";
import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { InputDB } from "../../components/forms/InputDB";
import { EnvelopeIcon } from "../../components/icons/EnvelopeIcon";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { SocialMediaIcon } from "../../components/icons/SocialMediaIcon";
import { TelephoneIcon } from "../../components/icons/TelephoneIcon";



export function Profile() {
  // Teste de Error no nome e e-mail
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

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
                setErrorEmail(e.currentTarget.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) == null ?
                  "E-mail inválido" : "");
              }}
            />



          </div>

        </form>
      </section>



    </div>
  );
}