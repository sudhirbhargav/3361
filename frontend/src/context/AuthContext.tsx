import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartItem, CartItems, User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  CartItems: CartItem[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[] | CartItems>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [CartItems, setCartItems] = useState<CartItems[] | null>(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decode the token to retrieve user information
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          Token: token,
        });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://mitbackend-5s9a.onrender.com/api/auth/login', {
        email,
        password,
      });
      const { token, user: userData } = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      // Update user state
      setUser({
        id: userData.id,
        email: userData.email,
        name: userData.username,
        Token: token,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    // Clear user state and token
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('https://mitbackend-5s9a.onrender.com/api/auth/signup', {
        username,
        email,
        password,
      });
      if (response.data.message !== 'User registered successfully!') {
        throw new Error('User did not register successfully!');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
        CartItems,
        setCartItems,
      }}
    >
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
