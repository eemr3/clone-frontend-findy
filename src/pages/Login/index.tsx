import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import c from '../../assets/c.svg'

import { Header } from "../../components/Header";
import { AuthContext } from "../../context/auth";
import { loginUser } from "../../services/api";
import { getErrorMessage } from "../../utils/ErrorMessageUtil";
interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Esse campo é obrigatório").email("E-mail inválido"),
    password: yup.string().required("Deve conter 8 dígitos, pelo menos um número, uma letra maiúscula e um caractere especial"),
  })
  .required();

export function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState("")
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  
const onSubmit = async (data: any) => {
  if (data != null) {
    const result = await loginUser(data.email, data.password);

    //toast.success(getErrorMessage(result));

    if (result?.status === 200) {
      signIn(result);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (result?.status === 401) {
      setAuthError("E-mail e/ou senha inválidos")
    }
  }

  setIsSuccess(true);
};

  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col  mbl:flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <Header />

      <div className="flex flex-col items-center  justify-center  xl:w-[100%] xl:justify-center md:px-[2rem] mbl:w-[100%]">
        <h1 className="text-[2.4rem] text-grey-#4 mb-[1.1rem]">Acesse a sua Conta</h1>
        <div className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem] shadow-shadow-#2-card">
          <div className="w-[70%] sm:justify-center flex-col mbl:flex mbl:w-[85%] mt-[5rem]">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={
                errors.email
                  ? "h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2  mbl:text-[1.3rem] "
                  : "mb-[1.49rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] text-grey-#2 mbl:mb-[1.5rem]  mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem] "
              }
            />
            <span className="block pl-[1rem] text-[1.8rem] text-red">
              {
                errors.email
                  ? errors.email.message
                  : ""
              }
            </span>
          </div>

          <div className="w-[70%] mbl:flex flex-col  mbl:w-[85%] mbl:justify-center ">
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className={
                errors.password
                  ? "h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] mt-[4rem] text-[2.4rem] placeholder-grey-#2 mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem]"
                  : "h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] text-grey-#2 mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem]"
              }
            />
            <span className="text-[1.8rem] text-red">
              {errors.password ? errors.password?.message : ""}{" "}
            </span>
            {authError && <span className="text-red text-[1.8rem]">{authError}</span>}
          </div>

          <div className="mt-[2rem] flex w-[70%] justify-between mbl:mt-[0] mbl:w-[80%]">
            <div className="flex">
              <div className="h-[2.7rem] w-[2.7rem] mr-[0.5rem] border border-green-medium rounded-lg">
                <input
                  className="mr-[1.2rem] h-[2.5rem] w-[2.5rem] accent-[#01A195] mbl:mr-[0.5rem] mbl:h-[2.2rem] rounded-lg "
                  type="checkbox"
                />
              </div>
              <p className="text-[2rem]  mbl:text-[1.3rem]">
                {/* <p className="text-[1.6rem]  mbl:text-[1.3rem] mbl:text-[1rem]"> */}
                Matenha-me logado
              </p>
            </div>
            { <Link
              to="/forgot_password"
              className="text-[2rem] text-blue  mbl:text-[1.3rem]"
            >
              Esqueceu a senha?
            </Link>}
          </div>
          <button
            className="mt-[3.4rem] h-[5.5rem] w-[65%] rounded-[3.2rem] bg-green-medium hover:bg-green-dark duration-500 mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]"
            onClick={handleSubmit(onSubmit)}
          >
            <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">
              Logar
            </p>
          </button>
          <p className="flex flex-col items-center mt-[3.4rem] mb-[2.4rem] text-[2.4rem] text-grey-#1 leading-[2rem]  mbl:mt-[4.4rem] mbl:text-[1.4rem]">
            Você é novo na Findy?{" "}
            <Link to="/cadastro" className="text-green-medium text-[2rem] underline">
              {" "}
              Crie sua conta aqui
            </Link>{" "}
          </p>
        </div>
        <footer>
          <p className="flex gap-[0.5rem] mt-[1.5rem] text-grey-#5 text-[1.5rem] font-mont">
            <img src={c} />
            Todos os direitos reservados a Findy
          </p>
        </footer>
      </div>
    </div>
  );
}
