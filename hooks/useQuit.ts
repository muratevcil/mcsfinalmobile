import * as SecureStore from 'expo-secure-store';
import { apiService } from '../lib/api';

export async function useQuit() {
    await SecureStore.deleteItemAsync('jwt');
    apiService.initializeJwt(null);
}
