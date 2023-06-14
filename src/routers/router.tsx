import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

import { CandidateUser } from '../types/CandidateUser';

import { Loading } from '../components/Loading';
import { Cadastro } from '../pages/Cadastro';
import { Home } from '../pages/Home/mvp-1/index';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Project } from '../pages/Project/index';
import { ProjectRegistred } from '../pages/ProjectsRegistered';
import { AuthContext, Token } from '../context/auth';
import { getCandidateUser } from '../services/api';
import { getErrorMessage } from '../utils/ErrorMessageUtil';
import { ForgotPassword } from '../pages/ForgotPassword';
import { PasswordRecovery } from '../pages/PasswordRecovery';

export const AppRouter = () => {
  const [candidateUser, setCandidateUser] = useState<CandidateUser>({} as CandidateUser);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isAuthenticated,
    loading,
    getToken,
    isTokenExpired,
    hasToken,
    signOutIfTokenIsExpiredOrNotExist,
  } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    if (hasToken() || (!hasToken() && isAuthenticated)) {
      const response = signOutIfTokenIsExpiredOrNotExist();

      response && toast.warning(response);
    }
  }, [location]);

  interface RouteElementProps {
    children: JSX.Element;
  }

  const Private = ({ children }: RouteElementProps) => {
    const token = getToken();

    if (!token || !isAuthenticated || isTokenExpired()) {
      return <Navigate to="/login" />;
    }

    if (loading) {
      return <div>Carregando...</div>;
    }

    return children;
  };

  const CanAccessProfile = ({ children }: RouteElementProps) => {
    if (!candidateUser) return <Navigate to="/login" />;

    if (candidateUser.profile && Object.keys(candidateUser.profile).length > 0)
      return <Navigate to="/" />;

    return children;
  };

  useEffect(() => {
    async function getUserToken() {
      const token = getToken();

      if (!token || !isAuthenticated) {
        return;
      }

      try {
        const { sub } = jwt_decode<Token>(token);

        await getCandidateUser(String(sub)).then((response) => {
          setCandidateUser(response.data);
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }

    getUserToken();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading type="3Dot" />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/first_access"
            element={
              <Private>
                <CanAccessProfile>
                  <Profile />
                </CanAccessProfile>
              </Private>
            }
          />
          <Route
            path="/project"
            element={
              <Private>
                <Project />
              </Private>
            }
          />
          <Route
            path="/project_registered"
            element={
              <Private>
                <ProjectRegistred />
              </Private>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/password_recovery" element={<PasswordRecovery />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};
