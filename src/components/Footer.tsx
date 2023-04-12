import { Link } from "react-router-dom";
import IconLinkedin from "../assets/img1.png";
import Icon2 from "../assets/img2.png";
import Icon3 from "../assets/img3.png";
import IconInstagram from "../assets/img4.png";

export function Footer() {
  return (
    <>
      <div className=" absolute bottom-0 h-[36rem] w-full items-center bg-blue-dark">
        {/* <div className="relative bottom-0 h-[36rem] w-full items-center bg-blue-dark"> */}
        <div className="w-full py-8 ">
          <div className="mb-[4rem] ml-[8rem] mt-[3rem] flex gap-x-4 ">
            <div className="flex h-[4rem] w-[4rem]  items-center justify-center rounded-full bg-green-medium">
              <img className="w-[1.9rem]" src={IconLinkedin} alt="" />
            </div>
            <div className="flex h-[4rem] w-[4rem]  items-center justify-center rounded-full bg-green-medium">
              <img className="w-[1.9rem]" src={Icon2} alt="" />
            </div>
            <div className="flex h-[4rem] w-[4rem]  items-center justify-center rounded-full bg-green-medium">
              <img className="w-[1.9rem]" src={Icon3} alt="" />
            </div>
            <div className="flex h-[4rem] w-[4rem]  items-center justify-center rounded-full bg-green-medium">
              <img className="w-[1.9rem]" src={IconInstagram} alt="" />
            </div>
          </div>
          <ul className="mx-auto grid w-[80%] grid-cols-2 gap-4 text-grey-#5 sm:grid-cols-4">
            <li className="flex flex-col">
              <h3 className="mb-2 text-[2.2rem] font-medium">Sobre Nós</h3>
              <Link to="/" className="text-[1.5rem]">
                Trabalhe conosco
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Conheça nossos valores
              </Link>
            </li>
            <li className="flex flex-col">
              <h3 className="mb-2 text-[2.2rem] font-medium">Para Empresas</h3>
              <Link to="/" className="text-[1.5rem]">
                Como funciona
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Nossos serviços
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Cases de sucesso
              </Link>
            </li>
            <li className="flex flex-col">
              <h3 className="mb-2 text-[2.2rem] font-medium">Para Juniors</h3>
              <Link to="/" className="text-[1.5rem]">
                Veja nossas vagas (trabalho)
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Veja nossas vagas (voluntariado)
              </Link>
            </li>
            <li className="flex flex-col">
              <h3 className="mb-2 text-[2.2rem] font-medium">Ajuda</h3>
              <Link to="/" className="text-[1.5rem]">
                Central de ajuda
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Perguntas frequentes
              </Link>
              <Link to="/" className="text-[1.5rem]">
                Conheça nosso blog
              </Link>
            </li>
          </ul>
          <div className="mt-[4.5rem] flex w-full ">
            <p className="mx-auto text-[1.6rem] text-grey-#5 ">
              Todos os direitos reservados a Findy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
