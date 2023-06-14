import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { recoveryPassword } from '../services/api';
import { useState } from 'react';

import mulherPagePrincipal from '../assets/mulher-page-principal2.svg';
import { ArrowGreenIcon } from './icons/ArrowGreenIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FormValue {
  email: string;
}

export function ForgetPassword() {
  const [cardEmail, setCardEmail] = useState(true);
  const [getMail, setGetMail] = useState<FormValue>({ email: '' });

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
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
      setGetMail({ email: data.email });
    }

    if (response?.status === 404 || 500) {
      setError('email', {
        message: 'O email informado não foi encontrado, por favor digite novamente.',
      });
    }
  }

  return (
    <div
      className="my-auto flex flex-col items-center  justify-center 
        md:px-[2rem] xl:w-[100%] xl:justify-center mbl:w-[100%]"
    >
      <h1 className="mb-[1.1rem] text-[2.4rem] text-grey-#4">Esqueci minha senha</h1>
      <div className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]">
        {cardEmail ? (
          <div className="mt-6 flex flex-col items-center justify-center px-[6rem]">
            <p className="mb-[1.1rem] text-[2.1rem] text-grey-#1">
              Digite abaixo o e-mail cadastrado na Findy. Você receberá um link de
              redefinição da senha.
            </p>
            <form
              onSubmit={handleSubmit(handlePasswordReset)}
              className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]"
            >
              <div className="mt-[5rem] w-[70%] flex-col sm:justify-center mbl:flex mbl:w-[85%]">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  className={
                    errors.email
                      ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2  mbl:text-[1.3rem] '
                      : 'mb-[1.49rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] text-grey-#2 mbl:mb-[1.5rem]  mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem] '
                  }
                />
                {errors.email?.message && (
                  <span className="mb-[1rem] mt-[0.8rem] block w-full text-[1.8rem] text-red">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="mt-[3.4rem] h-[5.5rem] w-[65%] rounded-[3.2rem] bg-green-medium duration-500 hover:bg-green-dark mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]"
              >
                <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">Enviar</p>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-[1rem]">
            <p className=" mx-[6rem] mt-[6rem] flex text-center text-[2.4rem] leading-[3.2rem]">
              <CheckIcon />O link foi enviado para o e-mail cadastrado. Cheque sua caixa
              de entrada.
            </p>
            <button className="mt-[2rem] h-[6rem] w-[70%] mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]">
              <Link
                to="/login"
                className="text-[2.4rem] text-green-medium mbl:text-[2.2rem] "
              >
                Voltar
              </Link>
            </button>
            <p className="mb-[5rem] mt-[2rem] text-center text-[2.4rem] leading-[3.2rem]">
              Não recebi o e-mail.{' '}
              <button
                onClick={() => handlePasswordReset(getMail)}
                className="text-green-medium"
              >
                Reenviar
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
