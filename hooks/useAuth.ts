// hooks/useAuth.ts
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useAuthStore } from './store/useAuthStore';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setJwt } = useAuthStore(); // <--- store'a yazmak için

  useEffect(() => {
    const checkToken = async () => {
      let token: string | null = null;

      if (Platform.OS !== 'web') {
        token = await SecureStore.getItemAsync('jwt');
      } else {
        token = localStorage.getItem('jwt');
      }

      setJwt(token); // <--- merkezi store’a yaz
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  return { isAuthenticated };
}
