import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import c from '../../assets/c.svg';

import IconLockOpen from '../../assets/view_fill.svg';
import IconLockClose from '../../assets/view_hide_fill.svg';
import { NavBar } from '../../components/menu/NavBar';
import { AuthContext } from '../../context/auth';
import { confirmationAccount, loginUser } from '../../services/api';
import { RegisterContext } from '../../context/newRegister';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { getErrorMessage } from '../../utils/ErrorMessageUtil';

interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().required('Esse campo é obrigatório').email('E-mail inválido'),
    password: yup
      .string()
      .required(
        'Deve conter 8 dígitos, pelo menos um número, uma letra maiúscula e um caractere especial',
      ),
  })
  .required();

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState('');
  const { signIn } = useContext(AuthContext);
  const { isRegistered, setIsRegistered } = useContext(RegisterContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('token') as string;
    if (id && token) {
      const activatedUser = async () => {
        const result = await confirmationAccount(Number(id), token);

        if (result?.status === 200) {
          setIsRegistered(false);

          return toast.success('Conta ativada com sucesso');
        }

        if (result?.statusCode === 400) {
          return toast.error(result.message);
        }
      };

      activatedUser();
    }
  }, []);

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

      if (result?.status === 200) {
        signIn(result);
        setTimeout(() => {
          navigate('/survey');
          /* navigate('/dashboard'); */
        }, 2000);
      }

      if (result?.status === 401) {
        setAuthError('E-mail e/ou senha inválidos');
      }
    }

    setIsSuccess(true);
  };

  return (
    <div
      className="w-max-[1483px] flex h-[100%] flex-col 
    overflow-x-hidden bg-blue-dark mbl:flex-col"
    >
      <NavBar home={false} url="/" />

      <div
        className="my-auto flex flex-col items-center  justify-center 
        md:px-[2rem] xl:w-[100%] xl:justify-center mbl:w-[100%]"
      >
        <h1 className="mb-[1.1rem] text-[2.4rem] text-grey-#4">Acesse a sua Conta</h1>
        <div className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem] shadow-shadow-#2-card">
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
            <span className="block pl-[1rem] text-[1.8rem] text-red">
              {errors.email ? errors.email.message : ''}
            </span>
          </div>

          <div className="w-[70%] flex-col mbl:flex  mbl:w-[85%] mbl:justify-center ">
            <div className="relative flex w-full items-center justify-end">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder="Senha"
                {...register('password')}
                className={
                  errors.password
                    ? 'mt-[4rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2 mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem]'
                    : 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] text-grey-#2 mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem]'
                }
              />
              {showPassword ? (
                <img
                  src={IconLockClose}
                  alt="Ícone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  src={IconLockOpen}
                  alt="Ícone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <span className="text-[1.8rem] text-red">
              {errors.password ? errors.password?.message : ''}{' '}
            </span>
            {authError && <span className="text-[1.8rem] text-red">{authError}</span>}
          </div>

          <div className="mt-[2rem] flex w-[70%] justify-between mbl:mt-[0] mbl:w-[80%]">
            <div className="flex">
              <div className="mr-[0.5rem] h-[2.7rem] w-[2.7rem] rounded-lg border border-green-medium">
                <input
                  className="mr-[1.2rem] h-[2.5rem] w-[2.5rem] rounded-lg accent-[#01A195] mbl:mr-[0.5rem] mbl:h-[2.2rem] "
                  type="checkbox"
                />
              </div>
              <p className="text-[2rem]  mbl:text-[1.3rem]">
                {/* <p className="text-[1.6rem]  mbl:text-[1.3rem] mbl:text-[1rem]"> */}
                Matenha-me logado
              </p>
            </div>
            {
              <Link
                to="/forgot-password"
                className="text-[2rem] text-blue  mbl:text-[1.3rem]"
              >
                Esqueceu a senha?
              </Link>
            }
          </div>
          <button
            className="mt-[3.4rem] h-[5.5rem] w-[65%] rounded-[3.2rem] bg-green-medium duration-500 hover:bg-green-dark mbl:mt-[4.5rem]  mbl:h-[4rem] mbl:max-w-[100%]"
            onClick={handleSubmit(onSubmit)}
          >
            <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">Logar</p>
          </button>
          <p className="mb-[2.4rem] mt-[3.4rem] flex flex-col items-center text-[2.4rem] leading-[2rem] text-grey-#1  mbl:mt-[4.4rem] mbl:text-[1.4rem]">
            Você é novo na Findy?{' '}
            <Link to="/cadastro" className="text-[2rem] text-green-medium underline">
              {' '}
              Crie sua conta aqui
            </Link>{' '}
          </p>
        </div>
        <footer>
          <p className="mt-[1.5rem] flex gap-[0.5rem] font-mont text-[1.5rem] text-grey-#5">
            <img src={c} />
            Todos os direitos reservados a Findy
          </p>
        </footer>
      </div>
    </div>
  );
}
