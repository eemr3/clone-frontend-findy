import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home/mvp-1/index";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile/Profile";
import { Project } from "../pages/Project/index";
import { ProjectRegistred } from "../pages/ProjectsRegistered";

export const AppRouter = () => {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={
          <Private>
            {" "}
            <Profile />{" "}
          </Private>
        }
      />
      <Route
        path="/project"
        element={
          <Private>
            {" "}
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
    </Routes>
  );
};
