import { HeaderTerms } from "./components/Header";
import ClosedImg from "../../assets/closed.svg"

export function GeneralTerms(){
    return(
        <div className="flex w-full min-h-[1919px] flex-col items-center gap-[20px] px-[79px] pt-[33px] pb-[17px] bg-[#21283C]">
            
            <div className="w-full"><HeaderTerms/></div>

                <h1 className="text-center text-[1.5rem] font-semibold leading-[31.2px] mt-5 text-grey-#4">Termos e Condições Gerais de Uso da Plataforma Findy</h1>
                
                    <div className="border rounded-[22.33px] max-w-[1124px] h-[1690px] px-[77px] pt-[65px] pb-[40px] gap-[10px] bg-[#FFF]">
                        <div className="w-[38px] h-[38px] text-right float-right"><img src={ClosedImg}/></div>

                        <div className="text-[1.5rem] text-[#000] flex-col ">
                        <h2 className="">1. Introdução</h2>
                        <p className="">Este documento estabelece os termos e condições gerais de uso da plataforma Findy, uma solução colaborativa e inovadora voltada para profissionais de tecnologia que buscam desenvolver habilidades, colaborar em projetos e expandir suas redes profissionais. Ao utilizar a plataforma Findy, você concorda com estes termos e condições.</p>
                        <h2>2. Funcionalidades da Plataforma</h2>
                        <p>A plataforma Findy oferece uma variedade de funcionalidades para ajudar os profissionais de tecnologia em suas jornadas de aprendizado e crescimento profissional</p>
                        <h2>3. Acesso à Plataforma</h2>
                        <p>O acesso à plataforma Findy é gratuito para os usuários registrados. No entanto, algumas funcionalidades podem estar sujeitas a taxas ou assinaturas específicas. Ao se registrar na plataforma, os usuários concordam em fornecer informações verdadeiras e atualizadas sobre si mesmos e em manter a confidencialidade de suas credenciais de acesso</p>
                        <h2>4. Uso Aceitável</h2>
                        <p>Os usuários da plataforma Findy concordam em utilizar os recursos e funcionalidades oferecidos de forma responsável e ética. É proibido:</p>
                        <ul>
                            <li>Violar direitos autorais, marcas registradas ou outros direitos de propriedade intelectual.</li>
                            <li>Utilizar a plataforma para fins ilegais ou prejudiciais.</li>
                            <li>Publicar ou compartilhar conteúdo ofensivo, discriminatório ou difamatório.</li>
                            <li>Tentar obter acesso não autorizado aos sistemas ou dados da plataforma.</li>
                        </ul>
                        <h2>5. Propriedade Intelectual</h2>
                        <p>Todo o conteúdo disponível na plataforma Findy, incluindo textos, imagens, gráficos e código-fonte, é protegido por direitos autorais e outros direitos de propriedade intelectual. Os usuários não podem copiar, modificar, distribuir ou utilizar o conteúdo da plataforma sem a permissão expressa dos respectivos titulares dos direitos.</p>
                        <h2>6. Limitação de Responsabilidade</h2>
                        <p>A Findy se esforça para manter a plataforma funcionando corretamente e fornecer informações precisas e atualizadas aos seus usuários. No entanto, a Findy não garante que todas as funcionalidades estarão sempre disponíveis ou livres de erros.

                        A Findy não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar a plataforma, incluindo, mas não se limitando a, perda de dados, lucros cessantes ou interrupção de negócios.</p>
                        <h2>7. Alterações nos Termos e Condições</h2>
                        <p>A Findy reserva-se o direito de modificar estes termos e condições a qualquer momento. Os usuários serão notificados sobre quaisquer alterações significativas e deverão revisar os termos atualizados periodicamente. O uso contínuo da plataforma após a publicação das alterações constitui aceitação dos novos termos e condições.</p>
                        <h2>8. Legislação Aplicável</h2>
                        <p>Estes termos e condições são regidos pelas leis do Brasil. Qualquer disputa ou reivindicação decorrente do uso da plataforma Findy será resolvida pelos tribunais competentes do Brasil</p>
                        <h2>9. Contato</h2>
                        <p>Se você tiver alguma dúvida ou preocupação em relação a estes termos e condições ou ao uso da plataforma Findy, entre em contato conosco através do nosso e-mail de suporte: suporte@findy.com.

                        Ao utilizar a plataforma Findy, você concorda com estes termos e condições gerais de uso. Certifique-se de revisá-los periodicamente para se manter informado sobre quaisquer atualizações ou alterações.

                        Agradecemos por escolher a Findy como sua plataforma para desenvolvimento profissional e colaboração. Estamos comprometidos em fornecer um ambiente seguro, eficiente e valioso para todos os nossos usuários.</p>
                        </div>
                    
                    
                </div>
                <p className="w-[466px] flex-col text-center text-[0.75rem] text-[#FFFFFF] font-sans not-italic font-normal leading-[15.6px]">© Todos direitos reservados a Findy.</p>            
            </div>
        
    )
}