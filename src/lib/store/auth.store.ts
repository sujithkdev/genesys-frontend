// This store is not used by the app — auth is handled via SessionProvider in session.tsx.
// It is kept here to avoid import errors from any legacy references.
import { create } from 'zustand';

interface AuthStore {
  user: null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: null;
  refreshToken: null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(() => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  setUser: () => {},
  refreshUser: async () => {},
}));
