
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email: string, password: string) => {
        // Hardcoded credentials
        if (email === 'admin@example.com' && password === 'admin123') {
          const user: User = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User'
          };
          set({ user });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'admin-auth',
    }
  )
);
