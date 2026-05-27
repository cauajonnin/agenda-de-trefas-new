import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { loginUser, registerUser, logoutUser, authStateChanged } from '../services/authService';

interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType>({} as FirebaseAuthContextType);

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);
    return result;
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    const result = await registerUser(email, password);
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await logoutUser();
    setLoading(false);
    return result;
  };

  return (
    <FirebaseAuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
