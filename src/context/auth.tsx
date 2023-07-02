import { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import jwt_decode from 'jwt-decode';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

interface User {
  email?: string;
}

export interface Token {
  sub: number;
  name: string;
  email: string;
  roles: string;
  iat: number;
  exp: number;
}

interface AuthContextData {
  user: User | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  finishiedSurvey: boolean;
  getToken: () => string;
  isTokenExpired: () => boolean;
  hasToken: () => boolean;
  setFinishiedSurvey: (value: boolean) => void;
  signOutIfTokenIsExpiredOrNotExist: () => string;
  signIn: (data: object) => void;
  signOut: () => void;
  setLoggedUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode | any;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(/* {} as User */);
  const isAuthenticated = !!user; /* JSON.stringify(user) !== "{}" */
  const [tokenExpiration, setTokenExpiration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finishiedSurvey, setFinishiedSurvey] = useState(false);

  function handleSetUser(token: string) {
    const { email, exp } = jwt_decode<Token>(token);

    if (!email) setLoading(false);

    setUser({ email });
    setTokenExpiration(exp * 1000);
  }

  useEffect(() => {
    async function configureToken() {
      const token = getToken();

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        handleSetUser(token);
      }
    }

    configureToken();
    //setLoading(false);
  }, []);

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      setLoading(false);
    }
  }, [user]);

  const getToken = () => {
    const { 'findy.token': token } = parseCookies();
    return token;
  };

  const isTokenExpired = () => {
    const token = getToken();

    if (!token) return true;

    const { exp } = jwt_decode<Token>(token);
    const isExpired = exp * 1000 < Date.now();
    return isExpired;
  };

  const hasToken = () => !!getToken();

  const signOutIfTokenIsExpiredOrNotExist = () => {
    const tokenNotExists = !hasToken();

    if (isTokenExpired() || (tokenNotExists && isAuthenticated)) {
      signOut();
      return tokenNotExists && tokenExpiration > Date.now()
        ? 'Login não identificado'
        : 'Login está expirado';
    }
    return '';
  };

  const signIn = async ({ data }: any) => {
    const { access_token: token } = data.data;

    const { exp } = jwt_decode<Token>(token);
    const expirationTime = Math.ceil((exp * 1000 - Date.now()) / 1000);

    setCookie(undefined, 'findy.token', token, {
      maxAge: expirationTime, //60 * 60 * 24, // 24 hours
      path: '/',
    });

    api.defaults.headers.Authorization = `Bearer ${token}`;
    handleSetUser(token);
  };

  const signOut = () => {
    destroyCookie(undefined, 'findy.token');
    api.defaults.headers.Authorization = null;
    setUser(undefined /* {} as User */);
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
        getToken,
        isTokenExpired,
        hasToken,
        signOutIfTokenIsExpiredOrNotExist,
        signIn,
        signOut,
        setLoggedUser,
        finishiedSurvey,
        setFinishiedSurvey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
