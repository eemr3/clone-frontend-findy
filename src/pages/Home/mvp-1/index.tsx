import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { AuthContext, Token } from '../../../context/auth';
import { getCandidateUser } from '../../../services/api';

import c from '../../../assets/c.svg';
import { NavBar } from '../../../components/NavBar';
import Highlight from '../../../components/landing/Highlight';
import Landing from '../../../components/landing';

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
    <div className="flex min-h-screen flex-col gap-y-24 bg-blue-dark-#1">
      <NavBar />
      <Landing />
    </div>
  );
}
