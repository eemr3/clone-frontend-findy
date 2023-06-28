import { Header } from "../../components/Header";
import { HeaderProfile } from "../../components/HeaderProfile";
import { Heading } from "../../components/Heading";


export function PrivacyPolicy(){
  return(
    <div className="max-w-[100%] bg-blue-dark h-auto">
      <div className="mx-auto max-w-[1180px] w-[100%]">
        <Header />

         <h1 className="text-[20px] font-semibold text-white text-center mb-[1.8rem]">
            Políticas de Privacidade
          </h1>

        <div className="bg-white text-black max-w-[800px] w-[100%] mx-auto p-[5rem] rounded-[15px] flex flex-col place-content-center mt-5 mb-[20px]">

          <h1 className="text-[25px] font-bold  pb-[1.6rem]">
            Política de Privacidade da Plataforma Findy
          </h1>

          <p className="text-grey-#1 text-[1.4rem] font-light">A plataforma Findy está comprometida em proteger a privacidade e a segurança dos dados de seus usuários. Esta Política de Privacidade foi elaborada para informar nossos usuários sobre as práticas de coleta, uso e divulgação de informações pessoais na plataforma. Ao utilizar a Findy, você concorda com as práticas descritas nesta política.</p>
        

          <h2>Coleta de Informações Pessoais</h2>
          <p>Ao utilizar a plataforma Findy e suas funcionalidades, coletamos informações pessoais sobre você para fornecer uma experiência personalizada e melhorar nossos serviços. As informações coletadas incluem:</p>
          <ul>
            <li>Informações demográficas</li>
            <li>Informações básicas pessoais</li>
            <li>Informações de perfil comportamental e profissional.</li>
          </ul>

          <h2>Uso das Informações Pessoais</h2>
          <p>Utilizamos as informações pessoais coletadas para:</p>
          <ul>
            <li>Personalizar sua experiência na plataforma, oferecendo recomendações e oportunidades relevantes com base em suas necessidades e objetivos profissionais.</li>
            <li>Melhorar nossos serviços através da análise das informações coletadas.</li>
            <li>Comunicar-se com você sobre atualizações, novas funcionalidades ou ofertas especiais.</ li>
            <li>Cumprir obrigações legais ou regulamentares.</li>
          </ul>

          <h2>Compartilhamento das Informações Pessoais</h2>
          <p>A Findy não compartilha suas informações pessoais com terceiros sem o seu consentimento, exceto nos seguintes casos:</p>
          <ul>
            <li>Para cumprir obrigações legais, regulamentares ou em resposta a um processo legal.</li>
            <li>Para proteger os direitos, a propriedade ou a segurança da Findy, de seus usuários ou do público em geral.</li>
            <li>No caso de uma fusão, aquisição ou venda de ativos da empresa, em que as informações pessoais dos usuários podem ser transferidas para a nova entidade.</li>
          </ul>

          <h2>Segurança das Informações Pessoais</h2>
          <p>A Findy implementa medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação. Essas medidas incluem criptografia de dados e armazenamento seguro das informações coletadas.</p>
        
          <h2>Acesso e Controle das Informações Pessoais</h2>
          <p>Você tem o direito de acessar e atualizar suas informações pessoais a qualquer momento através da plataforma Findy. Se você desejar excluir sua conta e todas as informações pessoais associadas, entre em contato conosco através do nosso suporte.</p>

          <h2>Alterações na Política de Privacidade</h2>
          <p>A Findy reserva-se o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. Ao continuar utilizando a plataforma após essas alterações, você concorda com as práticas atualizadas.</p>

          <h2>Contato</h2>
          <p>Se você tiver alguma dúvida sobre esta Política de Privacidade ou quiser exercer seus direitos relacionados às suas informações pessoais, entre em contato conosco através do nosso suporte.</p>
        </div>
      </div>   
    </ div>
  )
}