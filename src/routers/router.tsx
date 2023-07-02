import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CandidateUser } from '../types/CandidateUser';

import { Loading } from '../components/Loading';
import { AuthContext, Token } from '../context/auth';
import { Cadastro } from '../pages/Cadastro';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Home } from '../pages/Home/mvp-1/index';
import { Login } from '../pages/Login';
import { PasswordRecovery } from '../pages/PasswordRecovery';
import { Profile } from '../pages/Profile';
import { Project } from '../pages/Project/index';
import { ProjectRegistred } from '../pages/ProjectsRegistered';
import { Survey } from '../pages/Survey/index';
import { getCandidateUser } from '../services/api';
import { getErrorMessage } from '../utils/ErrorMessageUtil';

import { ConfimationAccount } from '../pages/ConfirmationAccount';
import { DashboardPage } from '../pages/Dashboard';
import { GeneralTerms } from '../pages/GeneralTerms/index';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';

export const AppRouter = () => {
  const [candidateUser, setCandidateUser] =
    useState<CandidateUser>(/* {} as CandidateUser */);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isAuthenticated,
    getToken,
    isTokenExpired,
    hasToken,
    signOutIfTokenIsExpiredOrNotExist,
    finishiedSurvey,
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
    const { pathname } = useLocation();

    if (!token || !isAuthenticated || isTokenExpired()) {
      return <Navigate to="/login" />;
    }

    //Preenchimento do Survey Obrigatório
    if (pathname !== '/survey' && candidateUser && !candidateUser.completeSurvey)
      return <Navigate to="/survey" />;

    return children;
  };

  const CanAccessProfile = ({ children }: RouteElementProps) => {
    if (!candidateUser) return <Navigate to="/login" />;

    if (candidateUser.profile && Object.keys(candidateUser.profile).length > 0)
      return <Navigate to="/" />;

    return children;
  };

  const CanAccessSurvey = ({ children }: RouteElementProps) => {
    if (!candidateUser) return <Navigate to="/login" />;

    if (candidateUser.completeSurvey || finishiedSurvey)
      return <Navigate to="/dashboard" />;

    return children;
  };

  useEffect(() => {
    async function getUserToken() {
      const token = getToken();

      if (!token || !isAuthenticated) {
        if (!token) setIsLoading(false);

        return;
      }

      try {
        const { sub } = jwt_decode<Token>(token);

        await getCandidateUser(String(sub))
          .then((response) => {
            setCandidateUser(response.data);
          })
          .then(() => setIsLoading(false));
      } catch (error) {
        toast.error(getErrorMessage(error));
        setIsLoading(false);
      }
    }

    getUserToken();
  }, [isAuthenticated, getToken]);

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/general-terms" element={<GeneralTerms />} />

          <Route
            path="/survey"
            element={
              <Private>
                <CanAccessSurvey>
                  <Survey />
                </CanAccessSurvey>
              </Private>
            }
          />
          <Route path="/confirmation-account" element={<ConfimationAccount />} />
          <Route
            path="/dashboard"
            element={
              <Private>
                <DashboardPage />
              </Private>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};
