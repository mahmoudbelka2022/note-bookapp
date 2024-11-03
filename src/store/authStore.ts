import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../api';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await api.login(email, password);
          localStorage.setItem('token', response.token);
          set({ user: response.user, isAuthenticated: true });
        } catch (error) {
          throw error instanceof Error 
            ? error 
            : new Error('Login failed. Please try again.');
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await api.register(name, email, password);
          localStorage.setItem('token', response.token);
          set({ user: response.user, isAuthenticated: true });
        } catch (error) {
          throw error instanceof Error 
            ? error 
            : new Error('Registration failed. Please try again.');
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);