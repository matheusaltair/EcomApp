import { create } from 'zustand';
import { persistAuth } from './authPersist';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - replace with actual API call later
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      if (email === 'test@example.com' && password === 'password') {
        set({
          user: { id: '1', name: name || 'Test User', email },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          error: 'Usuário ou senha incorretos.',
          isLoading: false,
        });
      }
      await persistAuth();
    } catch (error) {
      set({
        error: 'An error occurred during login',
        isLoading: false,
      });
    }
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    persistAuth();
  },
  
  clearError: () => {
    set({ error: null });
  },
}));