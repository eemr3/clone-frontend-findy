import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import IconLock from '../../components/icons/IconConfirm';
import { resetPassword } from '../../services/api';
import { Menu } from '../../components/menu';
import { LogoSmall } from '../../components/LogoSmall';
import IconLockOpen from '../../assets/view_fill.svg';
import IconLockClose from '../../assets/view_hide_fill.svg';
interface FormValue {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'A senha deve conter pelo menos um caractere especial',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas precisam ser iguais')
    .required(),
});

export function PasswordRecovery() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordSuccessResetModal, setPasswordSuccessResetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const searchParams = new URLSearchParams(document.location.search);
  const id = searchParams.get('id');
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const password = watch('password');

  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  async function handleResetPassword(data: FormValue) {
    const requestBody = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      recoverToken: token!,
    };

    if (id !== null) {
      await resetPassword(requestBody, id);

      setIsSuccess(true);
      setPasswordSuccessResetModal(true);

      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  }

  return (
    <div
      className="w-max-[1483px] flex h-[100%] flex-col 
    overflow-x-hidden bg-[#252C43] mbl:flex-col"
    >
      <Menu.Root>
        <LogoSmall />
        <Menu.MenuItems className="justify-end">
          <Menu.Action text="Voltar" url="/" />
        </Menu.MenuItems>
      </Menu.Root>
      <div className="my-auto flex flex-col items-center justify-center pt-[4.14rem] md:px-[2rem] xl:w-[100%] xl:justify-center mbl:px-[1.5rem] ">
        <h1 className="mb-[1.1rem] text-[2.4rem] text-grey-#4">Criar nova senha</h1>
        {passwordSuccessResetModal === false ? (
          <>
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="flex w-[100%]  max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] py-10 shadow-shadow-#2-card"
            >
              <div className="relative mt-[5rem] flex w-[70%]  items-center justify-end sm:justify-center  mbl:w-[85%]">
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

              <button
                type="submit"
                className="mdl:mt-[3rem] mt-[3.95rem] h-[6rem] w-[60%] rounded-[3.2rem] bg-[#01A195] text-[2.4rem] text-[#FFFFFF] duration-700 hover:bg-green-dark mbl:h-[4rem]"
              >
                <p className="text-[2.4rem] text-[#FFFFFF] mbl:text-[2.2rem] ">Alterar</p>
              </button>
            </form>
          </>
        ) : (
          <div className="flex w-[100%] max-w-[63.5rem] flex-col items-center rounded-[2.6rem] bg-[#FFFFFF] pb-[4rem]">
            <h2 className="mb-[6.4rem] mt-[6.4rem] text-center text-[4.8rem] font-[700] md:text-[4rem]  mbl:mb-[2.8rem] mbl:mt-[4.1rem] mbl:text-[2.5rem]">
              Senha redefinida com Sucesso!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
