"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const response = await fetch('/api/checkAuth');
      const data = await response.json();
      setIsAuth(data.isAuthenticated);
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
