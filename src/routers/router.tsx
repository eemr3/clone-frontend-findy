import { Route, Routes } from "react-router-dom";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home/mvp-1/index";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile/Profile";

export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
};
