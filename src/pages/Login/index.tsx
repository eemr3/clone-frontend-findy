import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LogoLarge } from "../../components/LogoLarge";
export function Login() {
  return (
    <>
    <div className="w-max-[144rem] flex flex-col">
      <Header />

      <div className="w-full h-[73vh] flex items-center">
        <LogoLarge className="absolute  mt-[1.533rem]  ml-[4.891rem] z-[-1]" />

        <div className="w-[63.5rem] h-[68rem] bg-[#FFFFFF]  mx-auto rounded-[2.6rem] flex items-center flex-col">
          <h2 className="text-[4.8rem] font-[700] mt-[6.4rem] mb-[6.4rem]">Acesse a sua conta</h2>
        
          <input className="w-[70%] mb-[2.4rem] h-[6rem] border border-black rounded-[0.8rem] pl-[1rem] text-[2.4rem]" type="email" placeholder="Email" />
          <input className="w-[70%] h-[6rem] border border-black rounded-[0.8rem] pl-[1rem] text-[2.4rem] " type="password" id="password" placeholder="Senha" /> 

          <div className="flex justify-between w-[70%] mt-[2rem]">
            <div className="flex">
            <input className="mr-[1.2rem] w-[2.8rem] h-[2.9rem] border-green-medium" type="checkbox" />
            <p className="text-[1.6rem]">Matenha-me logado</p>
            </div>
            <Link to="#" className="text-[1.6rem] text-green-medium ">Esqueceu a senha?</Link>

          </div>
          <button className="bg-[#01A195] w-[70%] h-[6rem] rounded-[3.2rem] mt-[6.6rem]">
            <p className="text-[#FFFFFF] text-[2.4rem] ">Login</p>
          </button>
          <p className="mt-[6.4rem] text-[2.4rem]">Você é novo na Findy? <Link to="#" className="text-[#01A195]">  Crie sua conta aqui</Link> </p>

      </div>


      </div>
      <Footer />
    </div>
    </>
  );
}
