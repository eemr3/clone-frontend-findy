import { createContext, useState } from 'react';

interface RegisterContextType {
  isRegistered: boolean;
  setIsRegistered: (isRegistered: boolean) => void;
}

interface RegisterProviderProps {
  children: React.ReactNode | any;
}

export const RegisterContext = createContext<RegisterContextType>(
  {} as RegisterContextType,
);

export function RegisterProvider({ children }: RegisterProviderProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <RegisterContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
