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
import { ProjectTest } from '../../Project/ProjectTest';

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
<InputDB
    icon={<PencilIcon className={'mbl:max-w-[2rem]'} />}
    label="Nome completo"
    placeholder="Nome"
    fieldSetClassName={'even:ml-auto'}
    fieldSetBG={`${
      candidateUser?.name != '' || undefined ? 'bg-[#d3d3d3!important]' : ''
    }`}
    error={'erros'}
    
/>

<InputDBv2
  label="Nome completo"
  requiredField
  placeholder="Digite seu nome"
  maxLength={70}
  error='err'
/>

<InputDBRefact  
    icon={<PencilIcon className={'mbl:max-w-[2rem]'} />}
    label="Nome completo"
    name="nameCandidate"
    type='text'
    maxLength={2}
    maskType='PHONE'
    placeholder="Nome"
    isWrittenWithDBData={!!candidateUser?.name}
    error={'erros'}
  />
<ProjectTest></ProjectTest>
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
