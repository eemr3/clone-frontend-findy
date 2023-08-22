import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext, Token } from '../../../context/auth';
import { getCandidateUser } from '../../../services/api';

import { Landing } from '../../../components/landing';
import { FooterLand } from '../../../components/landing/Footer';

import { Menu } from '../../../components/menu';
import { LogoSmall } from '../../../components/LogoSmall';

import { InputDB } from '../../../components/forms/InputDB';
import { PencilIcon } from '../../../components/icons/PencilIcon';
import { InputDBv2 } from '../../../components/forms/InputDBv2';
import { Input } from '../../../components/forms/Input';
import { InputDBRefact } from '../../../components/forms/InputRefact';
import { Profile } from '../../Profile';

// import mulherPagePrincipal from '../../../assets/mulher-page-principal.svg';
// import mulherPagePrincipal3 from '../../../assets/mulher-page-principal3.svg';

export function Home() {
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);
  const [candidateUser, setCandidateUser] = useState<any>();
  const { isAuthenticated, getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setLarguraTela(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    async function fetchData() {
      const token = getToken();

      if (token) {
        const { sub } = jwt_decode<Token>(token);

        const user = await getCandidateUser(String(sub));
        setCandidateUser(user.data);
      }
    }
    fetchData();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVerification = () => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para continuar', {
        style: { fontSize: '1.8rem' },
        autoClose: 1600,
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);

      return;
    }

    if (
      !candidateUser ||
      !candidateUser.profile ||
      Object.keys(candidateUser.profile).length === 0
    ) {
      return '/first_access';
    }

    return '/project_registered';
  };

  return (
    <>
    <input
      type="email"
      placeholder="Email"
      className={
          false
            ? 'h-[4.7rem] w-[100%] rounded-[0.8rem] border border-red pl-[2.06rem] text-[2.4rem] placeholder-grey-#2  mbl:text-[1.3rem] '
            : 'mb-[1.49rem] h-[4.7rem] w-[100%] rounded-[0.8rem] border border-grey-#2 pl-[2.06rem] text-[2.4rem] text-grey-#2 mbl:mb-[1.5rem]  mbl:h-[4.5rem] mbl:w-[90%] mbl:text-[1.3rem] '
      }
    />
<InputDBRefact  
    icon={PencilIcon}
    label="Nome completo"
    name="nameCandidate"
    type="text"
    disabled={false}
    readOnly
    isFilled={false}
    inputStyle="primary"
    placeholder="Nome"
    error={'erros'}
  />
</>
    /*
    <main className="flex w-full flex-col bg-blue-dark ">
      <Menu.Root>
        <LogoSmall />
        <Menu.MenuItems className="justify-between">
          <Menu.Items />
          <Menu.Action url="/cadastro" text="Cadastro" />
        </Menu.MenuItems>
      </Menu.Root>
      <Landing />
      <FooterLand />
    </main> */
  );
}
