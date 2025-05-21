// hooks/useAuthActions.ts
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useAuthStore } from './store/useAuthStore';
import { create } from 'zustand';
export function useAuthActions() {
  const { setJwt } = useAuthStore();
  const router = useRouter();

  const handleQuit = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setJwt(null);
  };

  return { handleQuit };
}
