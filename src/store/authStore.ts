import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from './cartStore';

interface User {
  _id: string;
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  nfcCardCount: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setUser: (user) => set({ user }),
      
      setToken: (token) => set({ token }),
      
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
        useCartStore.getState().clearCart();
      },
      
      isAuthenticated: () => {
        const { user, token } = get();
        return !!(user && token);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);