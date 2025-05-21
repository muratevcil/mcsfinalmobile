import * as SecureStore from 'expo-secure-store';

import { apiService } from '../lib/api';
import { useAuthStore } from './store/useAuthStore';
export function useCheckIfJwtValid(jwt:string) {
    

  const handleCheckIfJwtValid = async ()=>{
    const isValid:boolean = await apiService.checkIfJwtIsValid(jwt);
    return isValid;

  }

  return { handleCheckIfJwtValid };
}
