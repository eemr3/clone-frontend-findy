import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { recoveryPassword } from '../services/api';
import { useState } from 'react';

import mulherPagePrincipal from "../assets/mulher-page-principal2.svg";
import { ArrowGreenIcon } from './icons/ArrowGreenIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FormValue {
  email: string;
}

export function ForgetPassword() {
  const [cardEmail, setCardEmail] = useState(true);
  const [getMail, setGetMail] = useState<FormValue>({email: ''})

  const schema = yup
    .object()
    .shape({
      email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });


  async function handlePasswordReset(data: FormValue) {
    let response = await recoveryPassword(data.email);

    if (response?.status === 200) {
      setCardEmail(false);
      setGetMail({ email: data.email })
    }
    
    if (response?.status === 404 || 500) {
      setError("email", { message: "O email informado não foi encontrado, por favor digite novamente." });
    }
  }  

  return (
    <div className="my-auto  flex w-[55%] items-center justify-end  xl:w-[100%] xl:justify-center md:px-[2rem] mbl:w-[100%]">
      <img
        src={mulherPagePrincipal}
        alt="mulher"
        className="absolute right-[0]  top-[0] h-[100%] w-[54.6rem] object-cover xl:hidden "
      />

      <div className="flex w-[100%]  max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]">
        <h2 className="mb-[6.4rem] mt-[6.4rem] text-[4.8rem] font-[700] md:text-[4rem]  mbl:mb-[2.8rem] mbl:mt-[4.1rem] mbl:text-[2.5rem]">
          Esqueci minha senha
        </h2>
        {cardEmail ?
        <div className="flex flex-col items-center px-[6rem]">
          <p className="w-full text-center text-[2.4rem] mbl:mb-[2.8rem]  mbl:text-[2.5rem] mbl:text-center">
            Digite abaixo o e-mail cadastrado na Findy. Você receberá um link de redefinição da senha.
          </p>
          <form 
            onSubmit={handleSubmit(handlePasswordReset)} 
            className="flex-col w-[90%] items-center sm:justify-center mbl:flex mbl:w-[100%] mt-[1.9rem]">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={
                errors.email
                  ? "h-[6rem] w-[100%] p-[2rem] rounded-[0.8rem] border border-red  text-[2.4rem] placeholder-red mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem] "
                  : "mb-[2.4rem] h-[6rem] w-[100%] rounded-[0.8rem] border border-black pl-[1rem] text-[2.4rem] mbl:mb-[1.5rem]  mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem] "
              }
            />
            {errors.email?.message && (
              <span className="w-full mb-[1rem] mt-[0.8rem] block text-[1.8rem] text-red">
                {errors.email.message}
              </span>
            )}
           
            <button
              className="mt-[6.6rem] h-[6rem] w-full rounded-[3.2rem] bg-green-medium mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[90%]"
              >
              <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">
                ENVIAR
              </p>
            </button>
          </form>

          <Link to="/login" className="flex gap-[2rem] items-center mt-[6.4rem] text-[2.4rem] text-green-medium mbl:mt-[4.4rem] mbl:text-[1.4rem]">
            <ArrowGreenIcon />
            Retornar para a página de Login
          </Link>
        </div> :
        <>
          <p className=" flex text-[2.4rem] text-center leading-[3.2rem] mx-[6rem]">
            <CheckIcon />
            O link foi enviado para o e-mail cadastrado. Cheque sua caixa de entrada.
          </p>
          <button
            className="mt-[6.6rem] h-[6rem] w-[70%] mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]"
          >
            <Link to="/login" className="text-[2.4rem] text-green-medium mbl:text-[2.2rem] ">
              Voltar
            </Link>
          </button>
          <p className="text-[2.4rem] text-center leading-[3.2rem] mt-[6.4rem] mb-[8rem]">
            Não recebi o e-mail. <button onClick={() => handlePasswordReset(getMail) } className="text-green-medium">Reenviar</button>
          </p>
        </>} 
      </div>
    </div>
  )
}  