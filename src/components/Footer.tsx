import { Link } from "react-router-dom";
import IconLinkedin from "../assets/img1.png";
import Icon2 from "../assets/img2.png";
import Icon3 from "../assets/img3.png";
import IconInstagram from "../assets/img4.png";

export function Footer() {
  return (
    <>
    <div className=" h-[36rem] w-full items-center bg-blue-dark bottom-0 absolute">
      <div className="w-full py-8 ">
        <div className="flex gap-x-4 mb-[4rem] ml-[8rem] mt-[3rem] ">
          <div className="w-[4rem] h-[4rem] bg-green-medium  rounded-full flex items-center justify-center">
            <img className="w-[1.9rem]" src={IconLinkedin} alt="" />
          </div>
          <div className="w-[4rem] h-[4rem] bg-green-medium  rounded-full flex items-center justify-center">
            <img className="w-[1.9rem]" src={Icon2} alt="" />
          </div>
          <div className="w-[4rem] h-[4rem] bg-green-medium  rounded-full flex items-center justify-center">
            <img className="w-[1.9rem]" src={Icon3} alt="" />
          </div>
          <div className="w-[4rem] h-[4rem] bg-green-medium  rounded-full flex items-center justify-center">
            <img className="w-[1.9rem]" src={IconInstagram} alt="" />
          </div>
        </div>
          <ul className="w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-grey-#5">
            <li className="flex flex-col">
              <h3 className="text-[2.2rem] font-medium mb-2">Sobre Nós</h3>
              <Link to="/" className="text-[1.5rem]">Trabalhe conosco</Link>
              <Link to="/" className="text-[1.5rem]">Conheça nossos valores</Link>
            </li>
            <li className="flex flex-col">
              <h3 className="text-[2.2rem] font-medium mb-2">Para Empresas</h3>
              <Link to="/" className="text-[1.5rem]">Como funciona</Link>
              <Link to="/" className="text-[1.5rem]">Nossos serviços</Link>
              <Link  to="/" className="text-[1.5rem]">Cases de sucesso</Link>
            </li>
            <li className="flex flex-col">
              <h3 className="text-[2.2rem] font-medium mb-2">Para Juniors</h3>
              <Link to="/" className="text-[1.5rem]">Veja nossas vagas (trabalho)</Link>
              <Link to="/" className="text-[1.5rem]">Veja nossas vagas (voluntariado)</Link>
            </li>
            <li className="flex flex-col">
              <h3 className="text-[2.2rem] font-medium mb-2">Ajuda</h3>
              <Link to="/" className="text-[1.5rem]">Central de ajuda</Link>
              <Link to="/" className="text-[1.5rem]">Perguntas frequentes</Link>
              <Link to="/" className="text-[1.5rem]">Conheça nosso blog</Link>
            </li>
          </ul>
          <div className="w-full flex mt-[4.5rem] ">
          <p className="text-grey-#5 mx-auto text-[1.6rem] ">Todos os direitos reservados a Findy</p>
          </div>
      </div>
    </div>
    </>
  );
}
