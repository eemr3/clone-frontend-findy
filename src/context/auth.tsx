import { createContext, useEffect, useState } from "react";
import api from "../services/api";

interface User {
  email?: string;
}

interface AuthContextData {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (data: object) => void;
  logout: () => void;
  setLoggedUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode | any;
}
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | any>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (recoveredUser && token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(recoveredUser));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = ({ data }: any) => {
    const loggedUser = {
      data,
    };

    const token = data.data.access_token;

    console.log(data);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setAuthenticated(true);
    setUser(loggedUser);


  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setAuthenticated(false);
    setUser(null);
  };

  const setLoggedUser = (user: User) => {
    setUser(user);
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        loading,
        login,
        logout,
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
