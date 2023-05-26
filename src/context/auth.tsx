import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import jwt_decode from "jwt-decode";

interface User {
  email?: string;
}

export interface Token {
  sub: number;
  name: string;
  email: string;
  roles: string;
  iat: number;
  exp: number
}

interface AuthContextData {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  isTokenExpired: () => boolean;
  hasToken: () => boolean;
  signOutIfTokenIsExpiredOrNotExist: () => string;
  signIn: (data: object) => void;
  signOut: () => void;
  setLoggedUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode | any;
}
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = JSON.stringify(user) !== "{}"
  const [loading, setLoading] = useState(true);

  function handleSetUser(token: string) {
    const { email } = jwt_decode<Token>(token);
    setUser({ email });
  }

  useEffect(() => {

    async function configureToken() {
      const token = localStorage.getItem("token");

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        handleSetUser(token);
      }
    }

    configureToken();
    setLoading(false);
  }, []);

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");

    if (!token)
      return true;

    const { exp }/* : any */ = jwt_decode<Token>(token);
    const isExpired = (exp * 1000) < Date.now();
    return isExpired;
  }

  const hasToken = () => !!localStorage.getItem("token");

  const signOutIfTokenIsExpiredOrNotExist = () => {
    const tokenNotExists = !hasToken();
    if (isTokenExpired() || (tokenNotExists && isAuthenticated)) {
      signOut();
      return tokenNotExists ? "Login não identificado" : "Login está expirado";
    }
    return ""
  }

  const signIn = async ({ data }: any) => {

    const { access_token: token } = data.data;

    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;
    handleSetUser(token);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser({} as User);
  };

  const setLoggedUser = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        isTokenExpired,
        hasToken,
        signOutIfTokenIsExpiredOrNotExist,
        signIn,
        signOut,
        setLoggedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
