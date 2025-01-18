import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login authentication
    if (email.endsWith('@mit.edu')) {
      setUser({
        id: '1',
        email,
        name: email.split('@')[0]
      });
    } else {
      throw new Error('Only MIT email addresses are allowed');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (username: string, email: string, password: string) => {
    // Simulate signup logic (e.g., save user data to the database)
    if (email.endsWith('@mit.edu')) {
      setUser({
        id: '1',
        email,
        name: username
      });
    } else {
      throw new Error('Only MIT email addresses are allowed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
