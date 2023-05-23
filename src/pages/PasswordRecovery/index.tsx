import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import mulherPagePrincipal from "../../assets/mulher-page-principal2.svg";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconLock from "../../components/icons/IconConfirm";
import { resetPassword } from "../../services/api";
import { CandidateUserRegister } from "../../types/CandidateUserRegister";

interface FormValue {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
  confirmPassword: yup
    .string()
    .oneOf([undefined, yup.ref("password")], "As senhas precisam ser iguais"),
});

export function PasswordRecovery() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordSuccessResetModal, setPasswordSuccessResetModal] = useState(false)

  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CandidateUserRegister>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const password = watch("password");

  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );

  async function handleResetPassword(data: FormValue) {
    const requestBody = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      recoverToken: token!
    };
  
    if (id !== null) {
      await resetPassword(requestBody, id);
  
      setIsSuccess(true);
      setPasswordSuccessResetModal(true)
  
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  return (
    <div className="w-max-[144rem] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark">
      <Header showJustify={true} />

      <div className="my-auto  flex w-[55%] items-center justify-end  xl:w-[100%] xl:justify-center md:px-[2rem] mbl:w-[100%] ">
        <img
          src={mulherPagePrincipal}
          alt="mulher"
          className="absolute right-[0] top-[0] h-[100%] w-[54.6rem] object-cover xl:hidden "
        />

        {passwordSuccessResetModal === false ?
          <>
            <form
              onSubmit={handleSubmit(handleResetPassword)} 
              className="flex w-[100%]  max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]  "
            >
            <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700] md:text-[4rem]  mbl:mb-[2.8rem] mbl:mt-[4.1rem] mbl:text-[2.5rem]">
              Redefinir senha
            </h2>

            <div className="w-[70%] flex flex-col sm:justify-center  mbl:w-[85%]  ">
              <input
                type="password"
                placeholder="Insira a nova senha"
                {...register("password")}
                className={
                  errors.password
                    ? "h-[6rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:mr-[1rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]"
                    : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:mr-[1rem] mbl:h-[4.5rem]  mbl:text-[1.3rem]"
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
                    A senha deve ter pelo menos um caractere especial
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[70%]  mbl:flex  mbl:w-[85%] mbl:justify-center">
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
            <button
              type="submit"
              className="mt-[6.6rem] h-[6rem] w-[70%] rounded-[3.2rem] bg-[#01A195] mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]"
            >
              <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">
                Alterar
              </p>
            </button>
          </form>
        </> : 
        <div className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]">
          <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] text-center font-[700] md:text-[4rem]  mbl:mb-[2.8rem] mbl:mt-[4.1rem] mbl:text-[2.5rem]">
            Senha redefinida com Sucesso!
          </h2>
        </div>}
      </div>
    </div>
  )
}