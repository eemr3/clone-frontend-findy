import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useContext } from "react";
import { Link } from "react-router-dom";
import mulherPagePrincipal from "../../assets/mulher-page-principal2.svg";
import { Header } from "../../components/Header";
import { AuthContext } from "../../context/auth";
import { loginUser } from "../../services/api";
interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatório"),
  })
  .required();

export function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const onSubmit = async (data: any) => {
    console.log("ola");
    if (data != null) {
      let result = await loginUser(data.email, data.password);
      if (result?.status === 200) {
        login(result);
      }
    }
    setIsSuccess(true);
  };

  return (
    <div className="w-max-[144rem] flex h-[100%] flex-col bg-blue-dark">
      <Header showJustify={false} />

      <div className="flex w-[55%] items-center justify-end pb-[12rem] pt-[8rem] xl:w-[100%] xl:justify-center ">
        <img
          src={mulherPagePrincipal}
          alt="mulher"
          className="absolute right-[0]  top-[0] h-[100%] w-[54.6rem] object-cover xl:hidden "
        />

        <div className="flex h-[78.4rem]  w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF]">
          <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700]">
            Acesse a sua Conta
          </h2>

          <div className="w-[70%]  ">
            <input
              type="email"
              placeholder="insira seu email"
              {...register("email")}
              className={
                errors.email
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {
                errors.email
                  ? errors.email.message
                  : "" /* (result?.message === "" ? "" : result.message) */
              }
            </span>
          </div>

          <div className="w-[70%]  ">
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("password")}
              className={
                errors.password
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.password ? errors.password?.message : ""}{" "}
            </span>
          </div>

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
          <button
            className="mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195]"
            onClick={handleSubmit(onSubmit)}
          >
            <p className="text-[2.4rem] text-[#FFFFFF] ">Entrar</p>
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
    </div>
  );
}
