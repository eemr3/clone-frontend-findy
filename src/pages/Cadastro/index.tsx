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
    password: yup.string().required().min(8).matches(/[0-9]/).matches(/[A-Z]/),
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

  const onSubmit = async (data: any) => {
    const body = {
      name: data.nome,
      email: data.email,
      password: data.password,
      confirmPassword: data.password_confirmation,
    };

    if (data != null && isChecked) {
      let result = await createUser(body);
      console.log(result);
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
    <div className="w-max-[144rem] flex h-[100%] flex-col bg-blue-dark">
      <Header showJustify={false} />

      <div className="flex w-[55%] items-center justify-end pb-[12rem] pt-[8rem] xl:w-[100%] xl:justify-center ">
        <img
          src={mulherPagePrincipal}
          alt="mulher"
          className="absolute right-[0]  top-[0] h-[100%] w-[54.6rem] object-cover xl:hidden "
        />

        <div className="flex h-[98.5rem]  w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF]">
          <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700]">
            Crie uma Conta
          </h2>

          <div className="w-[70%]  ">
            <input
              type="name"
              placeholder="insira seu Nome"
              {...register("nome")}
              className={
                errors.nome
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.nome ? errors.nome?.message : ""}{" "}
            </span>
          </div>

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
              placeholder="insira sua senha"
              {...register("password")}
              className={
                errors.password
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem]"
              }
            />

            <div className="mb-[2rem]  mt-[1rem] flex w-[70%] flex-col gap-1 pl-[0.5rem] text-[1.6rem]">
              <div className="mt-[1rem] flex w-[39.7rem]">
                <IconLock
                  className={"mr-[1rem] h-[1.6rem] w-[1.6rem]"}
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

              <div className="mt-[1rem] flex w-[39.7rem]">
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

              <div className="mt-[1rem] flex w-[39.7rem]">
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
            </div>
          </div>

          <div className="w-[70%]  ">
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("password_confirmation")}
              className={
                errors.password_confirmation
                  ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red"
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem]"
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.password_confirmation
                ? errors.password_confirmation?.message
                : ""}{" "}
            </span>
          </div>

          <div className="mt-[2rem] flex w-[70%] justify-between">
            <div className="flex">
              <input
                className="mr-[1.2rem] h-[2.9rem] w-[2.8rem]"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
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
          <button
            className="mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195]"
            onClick={handleSubmit(onSubmit)}
          >
            <p className="text-[2.4rem] text-[#FFFFFF] ">Criar</p>
          </button>
          <p className="mb-[6rem] mt-[2.4rem] text-[2.4rem]">
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
