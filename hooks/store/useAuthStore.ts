import { create } from "zustand";

// store/useAuthStore.ts


interface AuthState {
    jwt: string | null;
    isLoading: boolean;
    setJwt: (token: string | null) => void;
    setIsLoading: (loading: boolean) => void;
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    jwt: null,
    isLoading: true,
    setJwt: (token) => set({ jwt: token }),
    setIsLoading: (loading) => set({ isLoading: loading }),
  }));
  