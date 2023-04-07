import { Link } from "react-router-dom";
import confirmar from "../../assets/confirmacao.svg";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LogoLarge } from "../../components/LogoLarge";

export function Cadastro() {
  return (
    <>
      <div className="w-max-[144rem] flex flex-col">
        <Header showJustify={false} />

        <div className="flex w-full items-center pt-[8rem] pb-[12rem]">
          <LogoLarge className="absolute  z-[-1]  mt-[1.533rem] ml-[4.891rem]" />

          <div className="mx-auto flex h-[98.5rem]  w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF]">
            <h2 className="mt-[6.4rem] mb-[6.4rem] text-[4.8rem] font-[700]">
              Crie uma Conta
            </h2>

            <input
              className="border-black mb-[2.4rem] h-[6rem] w-[70%] rounded-[0.8rem] border pl-[1rem] text-[2.4rem]"
              type="email"
              placeholder="Nome"
            />

            <input
              className="border-black mb-[2.4rem] h-[6rem] w-[70%] rounded-[0.8rem] border pl-[1rem] text-[2.4rem]"
              type="email"
              placeholder="Email"
            />

            <div className="border-black mb-[2.4rem] flex h-[6rem] w-[70%] items-center rounded-[0.8rem] border pl-[1rem] text-[2.4rem]">
              <input className="w-[80%]" type="password" placeholder="Senha" />
            </div>

            <div className="mb-[2rem]  flex w-[70%] flex-col gap-1 pl-[0.5rem]">
              <div className="flex w-[39.7rem]">
                <img
                  className="mr-[1rem] h-[1.6rem] w-[1.6rem]"
                  src={confirmar}
                  alt=""
                />{" "}
                <p className="text-[1.6rem]">
                  A senha deve ter pelo menos 8 dígitos
                </p>
              </div>
              <div className="flex w-[39.7rem]">
                <img
                  className="mr-[1rem] h-[1.6rem] w-[1.6rem]"
                  src={confirmar}
                  alt=""
                />{" "}
                <p className="text-[1.6rem]">
                  A senha deve ter pelo menos um número
                </p>
              </div>
              <div className="flex w-[39.7rem]">
                <img
                  className="mr-[1rem] h-[1.6rem] w-[1.6rem]"
                  src={confirmar}
                  alt=""
                />{" "}
                <p className="text-[1.6rem]">
                  A senha deve ter pelo menos uma letra maiúscula
                </p>
              </div>
            </div>
            <input
              className="border-black h-[6rem] w-[70%] rounded-[0.8rem] border pl-[1rem] text-[2.4rem] "
              type="password"
              id="password"
              placeholder="Confirmaçao de Senha"
            />

            <div className="mt-[2rem] flex w-[70%] justify-between">
              <div className="flex">
                <input
                  className="mr-[1.2rem] h-[2.9rem] w-[2.8rem]"
                  type="checkbox"
                />
                <p className="text-[1.7rem]">
                  Eu concordo com os{" "}
                  <Link to="#" className="text-[#01A195]">
                    Termos de Uso
                  </Link>{" "}
                  da plataforma e com as{" "}
                  <Link to="#" className="text-[#01A195]">
                    Políticas de Privacidade.
                  </Link>{" "}
                </p>
              </div>
            </div>
            <button className="mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195]">
              <p className="text-[2.4rem] text-[#FFFFFF] ">Login</p>
            </button>
            <p className="mt-[6.4rem] text-[2.4rem]">
              Já possui uma conta?{" "}
              <Link to="#" className="text-[#01A195]">
                {" "}
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
