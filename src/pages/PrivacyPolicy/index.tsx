import { Copyright } from "@phosphor-icons/react";
import { Header } from "../../components/Header";

export function PrivacyPolicy(){
  return(
    <div className="max-w-[100%] bg-blue-dark h-auto">
      <div className="mx-auto max-w-[1180px] w-[100%]">
        <Header />

         <h1 className="text-[20px] font-semibold text-white text-center mb-[1.8rem]">
            Políticas de Privacidade
        </h1>

        <div className="bg-white  text-black max-w-[800px] w-[100%] mx-auto p-[5rem] rounded-[15px] flex flex-col place-content-center mt-5 mb-[3rem]">

          <div className="mb-[2rem]">
            <h1 className="text-[25px] font-bold  pb-[1.6rem]">
              Política de Privacidade da Plataforma Findy
            </h1>

            <p className="text-grey-#1 text-[1.4rem] font-light">A plataforma Findy está comprometida em proteger a privacidade e a segurança dos dados de seus usuários. Esta Política de Privacidade foi elaborada para informar nossos usuários sobre as práticas de coleta, uso e divulgação de informações pessoais na plataforma. Ao utilizar a Findy, você concorda com as práticas descritas nesta política.</p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Coleta de Informações Pessoais</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">Ao utilizar a plataforma Findy e suas funcionalidades, coletamos informações pessoais sobre você para fornecer uma experiência personalizada e melhorar nossos serviços. As informações coletadas incluem:</p>
            <ul className="list-disc text-grey-#1 text-[1.4rem] font-light ml-[3rem] mt-[2rem]">
              <li>Informações demográficas</li>
              <li>Informações básicas pessoais</li>
              <li>Informações de perfil comportamental e profissional.</li>
            </ul>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Uso das Informações Pessoais</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">Utilizamos as informações pessoais coletadas para:</p>
            <ul className="list-decimal text-grey-#1 text-[1.4rem] font-light ml-[3rem] mt-[2rem]">
              <li>Personalizar sua experiência na plataforma, oferecendo recomendações e oportunidades relevantes com base em suas necessidades e objetivos profissionais.</li>
              <li>Melhorar nossos serviços através da análise das informações coletadas.</li>
              <li>Comunicar-se com você sobre atualizações, novas funcionalidades ou ofertas especiais.</ li>
              <li>Cumprir obrigações legais ou regulamentares.</li>
            </ul>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Compartilhamento das Informações Pessoais</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">A Findy não compartilha suas informações pessoais com terceiros sem o seu consentimento, exceto nos seguintes casos:</p>
            <ul className="list-decimal text-grey-#1 text-[1.4rem] font-light ml-[3rem] mt-[2rem]">
              <li>Para cumprir obrigações legais, regulamentares ou em resposta a um processo legal.</li>
              <li>Para proteger os direitos, a propriedade ou a segurança da Findy, de seus usuários ou do público em geral.</li>
              <li>No caso de uma fusão, aquisição ou venda de ativos da empresa, em que as informações pessoais dos usuários podem ser transferidas para a nova entidade.</li>
            </ul>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Segurança das Informações Pessoais</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">A Findy implementa medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação. Essas medidas incluem criptografia de dados e armazenamento seguro das informações coletadas.</p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Acesso e Controle das Informações Pessoais</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">Você tem o direito de acessar e atualizar suas informações pessoais a qualquer momento através da plataforma Findy. Se você desejar excluir sua conta e todas as informações pessoais associadas, entre em contato conosco através do nosso suporte.</p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Alterações na Política de Privacidade</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">A Findy reserva-se o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. Ao continuar utilizando a plataforma após essas alterações, você concorda com as práticas atualizadas.</p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="text-[20px] font-semibold  pb-[1rem]">Contato</h2>
            <p className="text-grey-#1 text-[1.4rem] font-light">Se você tiver alguma dúvida sobre esta Política de Privacidade ou quiser exercer seus direitos relacionados às suas informações pessoais, entre em contato conosco através do nosso suporte.</p>
          </div>
        </div>

        <div className="flex gap-[0.2rem] pb-[1rem] text-white items-center justify-center white">
          <Copyright size={15} />Todos direitos reservados a Findy.
        </div>
  
      </div>   
    </ div>
  )
}