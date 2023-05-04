import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CandidateUserRegister } from "../../types/CandidateUserRegister";
import { Header } from "../../components/Header";
import IconLock from "../../components/icons/IconConfirm";
import { createUser } from "../../services/api";
import mulherPagePrincipal from "../../assets/mulher-page-principal2.svg";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup
      .string()
      .min(3, "Mínimo de 3 caracteres ")
      .required("E-mail obrigatório")
      .email("E-mail inválido"),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/[0-9]/)
      .matches(/[A-Z]/)
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
    confirmPassword: yup
      .string()
      .oneOf([undefined, yup.ref("password")], "As senhas precisam ser iguais"),
    accept_terms: yup
      .boolean()
      /* .isTrue("Você precisa concordar com os Termos de Uso e com as Políticas de Privacidade"), */
      .oneOf([true], "Você precisa concordar com os Termos de Uso e com as Políticas de Privacidade"),
  })
  .required();

export function Cadastro() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<CandidateUserRegister>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const password = watch("password");

  const hasNumber = /\d/.test(password);
  const hasUppercase = /.*[A-Z].*/.test(password);
  const hasSpecialChar = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(
    password
  );

  const handleSubmitRegister: SubmitHandler<CandidateUserRegister> = async (data, event) => {
    /* const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }; */
    setActiveSubmit(true);
    event?.preventDefault();

    if (data == null && !isChecked)
      return null

    try {
      const response = await createUser(data);
      console.log('Success: ', response)
    } catch (error) {
      console.log('Error: ', error);
      //toast.error(error.message);
    }

    /*     if (data != null && isChecked) {
          let result = await createUser(data);
    
          if (result.status === 409) {
            setError("email", {
              message: result.message,
            });
            toast.error(result.message);
          }
        } */


    setIsSuccess(true);
    setActiveSubmit(false);
  };

  return (
    <div className="w-max-[144rem] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark">
      <Header showJustify={false} />

      <div className="my-auto flex w-[55%] items-center justify-end py-[10rem]  xl:w-[100%] xl:justify-center  xl:py-[15rem] md:px-[2rem] mbl:my-[10rem] mbl:px-[1.5rem] ">
        <img
          src={mulherPagePrincipal}
          alt="mulher"
          className="absolute right-[0]  top-[0] h-[100%]  w-[100%] max-w-[54.6rem] object-cover xl:hidden "
        />

        <form
          className="flex  w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] "
          onSubmit={handleSubmit(handleSubmitRegister)}
        >
          <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700] md:text-[4rem] mbl:mb-[2.8rem] md:mb-[4rem] mbl:mt-[4rem]  mbl:text-[2.5rem]">
            Crie uma Conta
          </h2>

          <div className="w-[70%] sm:justify-center  mbl:w-[85%]  ">
            <input
              type="name"
              placeholder="insira seu Nome"
              {...register("name")}
              className={
                errors.name
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.name ? errors.name?.message : ""}{" "}
            </span>
          </div>

          <div className="w-[70%]  sm:justify-center  mbl:w-[85%]  ">
            <input
              type="email"
              placeholder="insira seu email"
              {...register("email")}
              className={
                errors.email
                  ? "h-[6rem] w-[90%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
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

          <div className="w-[70%] sm:justify-center mbl:w-[85%] mbl:flex-col mbl:items-center ">
            <input
              type="password"
              placeholder="insira sua senha"
              {...register("password")}
              className={
                errors.password
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:mr-[1rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:mr-[1rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
              }
            />

            <div className="mb-[2rem]  mt-[1rem] flex w-[70%] flex-col gap-1 pl-[0.5rem] text-[1.6rem] mbl:w-[90%] ">
              <div className="mt-[1rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={"mr-[1rem] h-[1.6rem] w-[1.6rem] "}
                  fill={
                    errors.password
                      ? password.length < 8
                        ? "red"
                        : "#01A195"
                      : !isSuccess
                        ? "black"
                        : "#01A195"
                  }
                />
                <p
                  className={
                    errors.password
                      ? password.length < 8
                        ? "text-[red]"
                        : "text-[#01A195] "
                      : !isSuccess
                        ? "text-[black]"
                        : "text-[#01A195]"
                  }
                >
                  A senha deve ter pelo menos 8 dígitos
                </p>
              </div>

              <div className="mt-[1rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={"mr-[1rem] h-[1.6rem] w-[1.6rem]"}
                  fill={
                    errors.password
                      ? hasNumber
                        ? "#01A195"
                        : "red"
                      : !isSuccess
                        ? "black"
                        : "#01A195"
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasNumber
                        ? "text-[#01A195] "
                        : "text-[red]"
                      : !isSuccess
                        ? "text-[black]"
                        : "text-[#01A195]"
                  }
                >
                  A senha deve ter pelo menos um número
                </p>
              </div>

              <div className="mt-[1rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={"mr-[1rem] h-[1.6rem] w-[1.6rem]"}
                  fill={
                    errors.password
                      ? hasUppercase
                        ? "#01A195"
                        : "red"
                      : !isSuccess
                        ? "black"
                        : "#01A195"
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasUppercase
                        ? "text-[#01A195] "
                        : "text-[red]"
                      : !isSuccess
                        ? "text-[black]"
                        : "text-[#01A195]"
                  }
                >
                  A senha deve ter pelo menos uma letra maiúscula
                </p>
              </div>

              <div className="mt-[1rem] flex  w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={"mr-[1rem] h-[1.6rem] w-[1.6rem]"}
                  fill={
                    errors.password
                      ? hasSpecialChar
                        ? "#01A195"
                        : "red"
                      : !isSuccess
                        ? "black"
                        : "#01A195"
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasSpecialChar
                        ? "text-[#01A195] "
                        : "text-[red]"
                      : !isSuccess
                        ? "text-[black]"
                        : "text-[#01A195]"
                  }
                >
                  A senha deve ter pelo menos um caracter especial
                </p>
              </div>
            </div>
          </div>

          <div className="w-[70%] sm:justify-center mbl:flex mbl:w-[85%]">
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
              className={
                errors.confirmPassword
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.confirmPassword
                ? errors.confirmPassword?.message
                : ""}{" "}
            </span>
          </div>

          <div className="mt-[2rem] flex w-[70%] justify-between mbl:w-[76%]">
            <div className="flex">
              <input
                className="mr-[1.2rem] h-[2.9rem] w-[2.8rem]"
                type="checkbox"
                checked={isChecked}
                {...register("accept_terms", {
                  onChange: (e) => setIsChecked(e.target.checked)
                })}

              />
              <div className="flex flex-col gap-[0.75rem]">
                <p className="text-[1.7rem] mbl:text-[1.3rem]">
                  Eu concordo com os{" "}
                  <Link to="#" className="mdl:text-[2rem] text-[#01A195]">
                    Termos de Uso
                  </Link>{" "}
                  da plataforma e com as{" "}
                  <Link to="#" className="mdl:text-[1rem] text-[#01A195]">
                    Políticas de Privacidade.
                  </Link>{" "}
                </p>
                {errors.accept_terms && (
                  <span className="text-red text-[1.6rem]">{errors.accept_terms.message}</span>)}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mdl:mt-[3rem] mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195] mbl:h-[4rem] text-[2.4rem] text-[#FFFFFF]"
            disabled={activeSubmit}
          >
            Criar
          </button>
          <p className="mdl:mb-[3rem] mb-[6rem] mt-[2.4rem] text-[2.4rem] mbl:text-[2rem]">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-[#01A195]">
              {" "}
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
