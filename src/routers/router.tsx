import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { AuthContext } from "../context/auth";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home/mvp-1/index";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Project } from "../pages/Project/index";
import { ProjectRegistred } from "../pages/ProjectsRegistered";
import { getCandidateUser } from "../services/api";
import { CandidateUser } from "../types/CandidateUser";
import { Loading } from "../components/Loading";
import { ForgotPassword } from "../pages/ForgotPassword";
import { PasswordRecovery } from "../pages/PasswordRecovery";


export const AppRouter = () => {
  const [candidateUser, setCandidateUser] = useState<CandidateUser>({} as CandidateUser);
  const [isLoading, setIsLoading] = useState(true);
  //let isFirst = true;

  interface RouteElementProps {
    children: JSX.Element;
  }

  const Private = ({ children }: RouteElementProps /* { children }: any */) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  const CanAccessProfile = ({ children }: RouteElementProps) => {

    if (!candidateUser)
      return <Navigate to="/login" />

    if (candidateUser.profile && Object.keys(candidateUser.profile).length > 0)
      return <Navigate to="/" />


    return children;
  }

  useEffect(() => {
    async function getUserToken() {
      const token: string | any = localStorage.getItem("token");

      try {
        const { sub }: any = await jwt_decode(token);
        //const response = await getCandidateUser(sub);
        await getCandidateUser(sub)
        .then(response => {
          setCandidateUser(response.data)
          setIsLoading(false);
        })
        
      } catch(error) {
        setIsLoading(false);
      }
    }

    /*if(isFirst) {
      
      isFirst = false
    }*/

    getUserToken();
    
  }, []);

  useEffect(() => {
    console.log("isLoading : ", isLoading)
  },[isLoading])

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
        </Routes>
      )
      }
    </>
  );
}
