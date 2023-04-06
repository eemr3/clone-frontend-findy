import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

export function Profile() {
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

      <form
        className="mt-[10.2rem] bg-grey-#5 h-[32rem]"
        onSubmit={undefined}
      >


      </form>




    </div>
  );
}