import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import mulherPagePrincipal from "../../assets/mulher-page-principal2.svg";
import { Header } from "../../components/Header";
import IconLock from "../../components/icons/IconConfirm";
import { createUser } from "../../services/api";
interface FormValues {
  nome: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup
  .object()
  .shape({
    nome: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/[0-9]/)
      .matches(/[A-Z]/)
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
    password_confirmation: yup
      .string()
      .oneOf([undefined, yup.ref("password")], "As senhas precisam ser iguais"),
  })
  .required();

export function Cadastro() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const password = watch("password");

  const hasNumber = /\d/.test(password);
  const hasUppercase = /.*[A-Z].*/.test(password);
  const hasSpecialChar = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(
    password
  );

  const onSubmit = async (data: any) => {
    const body = {
      name: data.nome,
      email: data.email,
      password: data.password,
      confirmPassword: data.password_confirmation,
    };

    if (data != null && isChecked) {
      let result = await createUser(body);
      if (result.status === 201) {
        toast.success(result.message);
      }
      if (result.status === 409) {
        setError("email", {
          message: result.message,
        });
      }
    }
    setIsSuccess(true);
  };

  return (
    <div className="w-max-[144rem] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark">
      <Header showJustify={false} />

      <div className="my-auto flex w-[55%] items-center justify-end  xl:w-[100%] xl:justify-center  md:px-[2rem] mbl:px-[1.5rem] mbl:my-[10rem] ">
        <img
          src={mulherPagePrincipal}
          alt="mulher"
          className="absolute right-[0]  top-[0] h-[100%]  w-[100%] max-w-[54.6rem] object-cover xl:hidden "
        />

        <div className="flex  w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] ">
          <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700] md:text-[4rem] mbl:mb-[2.8rem] mbl:mb-[4rem] mbl:mt-[4.1rem]  mbl:mt-[4rem] mbl:text-[2.2rem] mbl:text-[2.5rem]">
            Crie uma Conta
          </h2>

          <div className="w-[60%] sm:justify-center  mbl:w-[85%]  ">
            <input
              type="name"
              placeholder="insira seu Nome"
              {...register("nome")}
              className={
                errors.nome
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.nome ? errors.nome?.message : ""}{" "}
            </span>
          </div>

          <div className="w-[100%]  sm:justify-center  mbl:w-[85%]  ">
            <input
              type="email"
              placeholder="insira seu email"
              {...register("email")}
              className={
                errors.email
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
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
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:mr-[1rem] mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:mr-[1rem] mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
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
              {...register("password_confirmation")}
              className={
                errors.password_confirmation
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:h-[4.3rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.password_confirmation
                ? errors.password_confirmation?.message
                : ""}{" "}
            </span>
          </div>

          <div className="mt-[2rem] flex w-[70%] justify-between mbl:w-[76%]">
            <div className="flex">
              <input
                className="mr-[1.2rem] h-[2.9rem] w-[2.8rem]"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
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
            </div>
          </div>
          <button
            className="mdl:mt-[3rem] mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195] mbl:h-[4rem]"
            onClick={handleSubmit(onSubmit)}
          >
            <p className="text-[2.4rem] text-[#FFFFFF]  ">Criar</p>
          </button>
          <p className="mdl:mb-[3rem] mb-[6rem] mt-[2.4rem] text-[2.4rem] mbl:text-[2rem]">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-[#01A195]">
              {" "}
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
