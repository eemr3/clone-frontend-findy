import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LogoLarge } from "../../components/LogoLarge";
export function Login() {
  return (
    <>
      <div className="w-max-[144rem] flex flex-col">
        <Header />

        <div className="flex h-[73vh] w-full items-center">
          <LogoLarge className="absolute  z-[-1]  mt-[1.533rem] ml-[4.891rem]" />

          <div className="mx-auto flex h-[68rem]  w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF]">
            <h2 className="mt-[6.4rem] mb-[6.4rem] text-[4.8rem] font-[700]">
              Acesse a sua conta
            </h2>

            <input
              className="border-black mb-[2.4rem] h-[6rem] w-[70%] rounded-[0.8rem] border pl-[1rem] text-[2.4rem]"
              type="email"
              placeholder="Email"
            />
            <input
              className="border-black h-[6rem] w-[70%] rounded-[0.8rem] border pl-[1rem] text-[2.4rem] "
              type="password"
              id="password"
              placeholder="Senha"
            />

            <div className="mt-[2rem] flex w-[70%] justify-between">
              <div className="flex">
                <input
                  className="mr-[1.2rem] h-[2.9rem] w-[2.8rem] border-green-medium"
                  type="checkbox"
                />
                <p className="text-[1.6rem]">Matenha-me logado</p>
              </div>
              <Link to="#" className="text-[1.6rem] text-green-medium ">
                Esqueceu a senha?
              </Link>
            </div>
            <button className="mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195]">
              <p className="text-[2.4rem] text-[#FFFFFF] ">Login</p>
            </button>
            <p className="mt-[6.4rem] text-[2.4rem]">
              Você é novo na Findy?{" "}
              <Link to="#" className="text-[#01A195]">
                {" "}
                Crie sua conta aqui
              </Link>{" "}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
