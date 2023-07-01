import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, set, useForm } from 'react-hook-form';
import * as yup from 'yup';

import IconLockOpen from '../../assets/view_fill.svg';
import IconLockClose from '../../assets/view_hide_fill.svg';
import IconLock from '../../components/icons/IconConfirm';
import { createUser } from '../../services/api';
import { CandidateUserRegister } from '../../types/CandidateUserRegister';
import { getErrorMessage } from '../../utils/ErrorMessageUtil';

import c from '../../assets/c.svg';
import { NavBar } from '../../components/menu/NavBar';
import { RegisterContext } from '../../context/newRegister';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup
      .string()
      .min(3, 'Mínimo de 3 caracteres ')
      .required('E-mail obrigatório')
      .email('E-mail inválido'),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/[0-9]/)
      .matches(/[A-Z]/)
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
    confirmPassword: yup
      .string()
      .oneOf([undefined, yup.ref('password')], 'As senhas precisam ser iguais'),
    accept_terms: yup
      .boolean()
      .isTrue('A aceitação dos termos e condições é necessária para continuar.'),
  })
  .required();

export function Cadastro() {
  const { setIsRegistered } = useContext(RegisterContext);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }, // Adicione essa propriedade na desestruturação
  } = useForm<CandidateUserRegister>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const password = watch('password');

  const hasNumber = /\d/.test(password);
  const hasUppercase = /.*[A-Z].*/.test(password);
  const hasSpecialChar = /.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*/.test(password);

  const handleSubmitRegister: SubmitHandler<CandidateUserRegister> = async (
    data,
    event,
  ) => {
    setActiveSubmit(true);
    event?.preventDefault();

    if (data == null && !isChecked) return null;

    try {
      const response = await createUser(data);
      toast.success('Conta criada com sucesso!');
      setIsRegistered(true);
      navigate('/confirmation-account');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }

    setIsSuccess(true);
    setActiveSubmit(false);
  };

  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark">
      <NavBar home={false} url="/" />
      <div className="my-auto flex flex-col items-center justify-center pt-[4.14rem] md:px-[2rem] xl:w-[100%] xl:justify-center mbl:px-[1.5rem]">
        <h1 className="mb-[1.1rem] text-[2.4rem] text-grey-#4">Crie uma Conta</h1>
        <form
          className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] shadow-shadow-#2-card"
          onSubmit={handleSubmit(handleSubmitRegister)}
        >
          <div className="mt-[5rem] w-[70%] sm:justify-center  mbl:w-[85%]">
            <input
              type="name"
              placeholder="Nome"
              {...register('name')}
              className={
                errors.name
                  ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2 mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                  : 'mb-[1.49rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] focus:border-green-medium mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.name ? errors.name?.message : ''}{' '}
            </span>
          </div>

          <div className="w-[70%]  sm:justify-center  mbl:w-[85%]  ">
            <input
              type="email"
              placeholder="E-mail"
              {...register('email')}
              className={
                errors.email
                  ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2 mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                  : 'mb-[1.49rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] focus:border-green-medium mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
              }
            />
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.email ? errors.email.message : ''}
            </span>
          </div>

          <div className="w-[70%] sm:justify-center mbl:w-[85%] mbl:flex-col mbl:items-center ">
            <div className="relative flex w-full items-center justify-end">
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                placeholder="Senha"
                {...register('password')}
                className={
                  errors.password
                    ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2 mbl:mr-[1rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                    : 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] focus:border-green-medium mbl:mr-[1rem] mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                }
              />
              {showPassword ? (
                <img
                  src={IconLockClose}
                  alt="Icone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <img
                  src={IconLockOpen}
                  alt="Icone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="mt-[0.92rem] flex w-[70%] flex-col gap-1 pl-[0.5rem] text-[1.6rem] mbl:w-[90%] ">
              <div className="mt-[0.9rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={'mr-[0.75rem] h-[2.5rem] w-[2.5rem] '}
                  stroke={
                    errors.password
                      ? password.length < 8
                        ? 'red'
                        : 'grey'
                      : !isSuccess
                      ? 'grey'
                      : 'red'
                  }
                />
                <p
                  className={
                    errors.password
                      ? password.length < 8
                        ? 'text-[red]'
                        : 'text-grey-#2'
                      : !isSuccess
                      ? 'text-grey-#2'
                      : 'text-grey-#2'
                  }
                >
                  A senha deve ter pelo menos 8 dígitos
                </p>
              </div>

              <div className="mt-[0.38rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={'mr-[0.75rem] h-[2.5rem] w-[2.5rem]'}
                  stroke={
                    errors.password
                      ? !hasNumber
                        ? 'red'
                        : 'grey'
                      : !isSuccess
                      ? 'gray'
                      : 'red'
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasNumber
                        ? 'text-grey-#2'
                        : 'text-[red]'
                      : !isSuccess
                      ? 'text-grey-#2'
                      : 'text-grey-#2'
                  }
                >
                  A senha deve ter pelo menos 1 número
                </p>
              </div>

              <div className="mt-[0.38rem] flex w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={'mr-[0.75rem] h-[2.5rem] w-[2.5rem]'}
                  stroke={
                    errors.password
                      ? !hasUppercase
                        ? 'red'
                        : 'grey'
                      : !isSuccess
                      ? 'grey'
                      : 'red'
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasUppercase
                        ? 'text-grey-#2'
                        : 'text-[red]'
                      : !isSuccess
                      ? 'text-grey-#2'
                      : 'text-grey-#2'
                  }
                >
                  A senha deve ter pelo menos 1 letra maiúscula
                </p>
              </div>

              <div className="mt-[0.38remrem] flex  w-[39.7rem] mbl:text-[1.3rem]">
                <IconLock
                  className={'mr-[0.75rem] h-[2.5rem] w-[2.5rem]'}
                  stroke={
                    errors.password
                      ? !hasSpecialChar
                        ? 'red'
                        : 'grey'
                      : !isSuccess
                      ? 'grey'
                      : 'red'
                  }
                />
                <p
                  className={
                    errors.password
                      ? hasSpecialChar
                        ? 'text-grey-#2'
                        : 'text-[red]'
                      : !isSuccess
                      ? 'text-grey-#2'
                      : 'text-grey-#2'
                  }
                >
                  A senha deve ter pelo menos 1 caractere especial
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[1.54rem] w-[70%] sm:justify-center mbl:flex mbl:w-[85%]">
            <div className="relative flex w-full items-center justify-end">
              <input
                type={`${confirmShowPassword ? 'text' : 'password'}`}
                placeholder="Confirmação de senha"
                {...register('confirmPassword')}
                className={
                  errors.confirmPassword
                    ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[1rem] text-[2.4rem] placeholder-red mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                    : 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] focus:border-green-medium mbl:h-[4.5rem] mbl:w-[100%] mbl:text-[1.3rem]'
                }
              />
              {confirmShowPassword ? (
                <img
                  src={IconLockClose}
                  alt="Icone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                />
              ) : (
                <img
                  src={IconLockOpen}
                  alt="Icone de olho"
                  className="absolute z-20 mr-2 w-10 cursor-pointer"
                  onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                />
              )}
            </div>
            <span className=" mb-[1rem] mt-[0.8rem] block  pl-[1rem] text-[1.8rem] text-red">
              {errors.confirmPassword ? errors.confirmPassword?.message : ''}{' '}
            </span>
          </div>

          <div className="mt-[1.39rem] flex w-[70%] mbl:w-[76%]">
            <div className="flex gap-[1.5rem]">
              <div
                className={
                  errors.accept_terms
                    ? 'h-[4.0rem] w-[4.0rem] rounded-lg border-[2px] border-red'
                    : 'h-[4.0rem] w-[4.0rem] rounded-lg border-[2px] border-green-medium'
                }
              >
                <input
                  className="mr-[1.2rem] h-[3.6rem] w-[3.6rem] rounded-lg accent-[#01A195]"
                  type="checkbox"
                  checked={isChecked}
                  /* {...register("accept_terms", {
                  onChange: (e) => setIsChecked(e.target.checked)
                })} */

                  {...register('accept_terms')}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    clearErrors('accept_terms');
                  }}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-[1.7rem] text-grey-#1 mbl:text-[1.3rem]">
                  Eu concordo com os{' '}
                  <Link to="/general-terms" className="mdl:text-[2rem] text-[#01A195]">
                    Termos de Uso
                  </Link>{' '}
                  da plataforma e com as{' '}
                  <Link to="/privacy-policy" className="mdl:text-[1rem] text-[#01A195]">
                    Políticas de Privacidade.
                  </Link>{' '}
                </p>
                {errors.accept_terms && (
                  <span className="text-[1.6rem] text-red">
                    {errors.accept_terms.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mdl:mt-[3rem] mt-[3.95rem] h-[6rem] w-[60%] rounded-[3.2rem] bg-[#01A195] text-[2.4rem] text-[#FFFFFF] duration-700 hover:bg-green-dark mbl:h-[4rem]"
            disabled={activeSubmit}
          >
            Criar conta
          </button>
          <p className="mdl:mb-[3rem] mb-[6rem] mt-[2.4rem] flex flex-col items-center text-[2.4rem] text-grey-#1 mbl:text-[2rem]">
            Já possui uma conta?{' '}
            <Link to="/login" className="text-[#01A195] underline">
              {' '}
              Login
            </Link>{' '}
          </p>
        </form>
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
