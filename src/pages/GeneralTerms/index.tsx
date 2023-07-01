import { Copyright } from '@phosphor-icons/react';
import ClosedImg from '../../assets/closed.svg';
import { NavBar } from '../../components/menu/NavBar';

export function GeneralTerms() {
  return (
    <div className="h-auto max-w-[100%] bg-blue-dark">
      <div className="mx-auto w-[100%] max-w-[1180px]">
        <NavBar home={false} url="/cadastro" />

        <h1 className="mb-[1.8rem] text-center text-[20px] font-semibold text-white">
          Termos e Condições Gerais de Uso da Plataforma Findy
        </h1>

        <div className="mx-auto  mb-[3rem] mt-5 flex w-[100%] max-w-[800px] flex-col place-content-center rounded-[15px] bg-white p-[5rem] text-black">
          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">1. Introdução</h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              Este documento estabelece os termos e condições gerais de uso da plataforma
              Findy, uma solução colaborativa e inovadora voltada para profissionais de
              tecnologia que buscam desenvolver habilidades, colaborar em projetos e
              expandir suas redes profissionais. Ao utilizar a plataforma Findy, você
              concorda com estes termos e condições.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              2. Funcionalidades da Plataforma
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              A plataforma Findy oferece uma variedade de funcionalidades para ajudar os
              profissionais de tecnologia em suas jornadas de aprendizado e crescimento
              profissional.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              3. Acesso à Plataforma
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              O acesso à plataforma Findy é gratuito para os usuários registrados. No
              entanto, algumas funcionalidades podem estar sujeitas a taxas ou assinaturas
              específicas. Ao se registrar na plataforma, os usuários concordam em
              fornecer informações verdadeiras e atualizadas sobre si mesmos e em manter a
              confidencialidade de suas credenciais de acesso.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">4. Uso Aceitável</h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              Os usuários da plataforma Findy concordam em utilizar os recursos e
              funcionalidades oferecidos de forma responsável e ética. É proibido:
            </p>
            <ul className="ml-[3rem] mt-[2rem] list-decimal text-[1.4rem] font-light text-grey-#1">
              <li>
                Violar direitos autorais, marcas registradas ou outros direitos de
                propriedade intelectual.
              </li>
              <li>Utilizar a plataforma para fins ilegais ou prejudiciais</li>
              <li>
                Publicar ou compartilhar conteúdo ofensivo, discriminatório ou
                difamatório.
              </li>
              <li>
                Tentar obter acesso não autorizado aos sistemas ou dados da plataforma.
              </li>
            </ul>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              5. Propriedade Intelectual
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              Todo o conteúdo disponível na plataforma Findy, incluindo textos, imagens,
              gráficos e código-fonte, é protegido por direitos autorais e outros direitos
              de propriedade intelectual. Os usuários não podem copiar, modificar,
              distribuir ou utilizar o conteúdo da plataforma sem a permissão expressa dos
              respectivos titulares dos direitos.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              6. Limitação de Responsabilidade
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              A Findy se esforça para manter a plataforma funcionando corretamente e
              fornecer informações precisas e atualizadas aos seus usuários. No entanto, a
              Findy não garante que todas as funcionalidades estarão sempre disponíveis ou
              livres de erros.
            </p>
            <p className="mt-[1rem] text-[1.4rem] font-light text-grey-#1">
              A Findy não será responsável por quaisquer danos diretos, indiretos,
              incidentais ou consequenciais resultantes do uso ou incapacidade de usar a
              plataforma, incluindo, mas não se limitando a, perda de dados, lucros
              cessantes ou interrupção de negócios.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              7. Alterações nos Termos e Condições
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              A Findy reserva-se o direito de modificar estes termos e condições a
              qualquer momento. Os usuários serão notificados sobre quaisquer alterações
              significativas e deverão revisar os termos atualizados periodicamente. O uso
              contínuo da plataforma após a publicação das alterações constitui aceitação
              dos novos termos e condições.
            </p>
          </div>

          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">
              8. Legislação Aplicável
            </h2>
            <p className="text-[1.4rem] font-light text-grey-#1">
              Estes termos e condições são regidos pelas leis do Brasil. Qualquer disputa
              ou reivindicação decorrente do uso da plataforma Findy será resolvida pelos
              tribunais competentes do Brasil.
            </p>
          </div>
          <div className="mb-[2rem]">
            <h2 className="pb-[1rem] text-[20px]  font-semibold">9. Contato</h2>
            <p className="mb-[1rem] text-[1.4rem] font-light text-grey-#1">
              Se você tiver alguma dúvida ou preocupação em relação a estes termos e
              condições ou ao uso da plataforma Findy, entre em contato conosco através do
              nosso e-mail de suporte: suporte@findy.com.
            </p>
            <p className="mb-[1rem] text-[1.4rem] font-light text-grey-#1">
              Ao utilizar a plataforma Findy, você concorda com estes termos e condições
              gerais de uso. Certifique-se de revisá-los periodicamente para se manter
              informado sobre quaisquer atualizações ou alterações.
            </p>
            <p className="mb-[1rem] text-[1.4rem] font-light text-grey-#1">
              Agradecemos por escolher a Findy como sua plataforma para desenvolvimento
              profissional e colaboração. Estamos comprometidos em fornecer um ambiente
              seguro, eficiente e valioso para todos os nossos usuários.
            </p>
            <p className="mb-[1rem] text-[1.4rem] font-light text-grey-#1"></p>
          </div>
        </div>

        <div className="white flex items-center justify-center gap-[0.2rem] pb-[1rem] text-white">
          <Copyright size={15} />
          Todos direitos reservados a Findy.
        </div>
      </div>
    </div>
  );
}
{
  /* <ul className="ml-[3rem] mt-[2rem] list-decimal text-[1.4rem] font-light text-grey-#1">
<li>
  Personalizar sua experiência na plataforma, oferecendo recomendações e
  oportunidades relevantes com base em suas necessidades e objetivos
  profissionais.
</li>
<li>
  Melhorar nossos serviços através da análise das informações coletadas.
</li>
<li>
  Comunicar-se com você sobre atualizações, novas funcionalidades ou ofertas
  especiais.
</li>
<li>Cumprir obrigações legais ou regulamentares.</li>
</ul> */
}
