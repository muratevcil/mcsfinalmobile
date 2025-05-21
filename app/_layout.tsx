import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Tabs } from 'expo-router';
import { Alert, BackHandler, Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SystemUI from 'expo-system-ui';
import { useAuthStore } from '../hooks/store/useAuthStore';
import * as SecureStore from 'expo-secure-store';
import { useCheckIfJwtValid } from '../hooks/useCheckIfJwtValid';
import { apiService } from '../lib/api';
// SplashScreen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';
  const statusBarPaddingTop = Platform.OS === 'android' ? 45 : 0;
  const setJwt = useAuthStore((state)=>state.setJwt);
  const {jwt} = useAuthStore();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    console.log("Cache:"+jwt);
    console.log("SecureStore:"+SecureStore.getItem("jwt"));
    //Handle JWT registiration to zustand

    const handleJwtRegisteration = async () =>{
      const jwtInSecureStore = await SecureStore.getItemAsync('jwt');
      if(jwtInSecureStore != null){
      const { handleCheckIfJwtValid } = useCheckIfJwtValid(jwtInSecureStore);
      const checkJwt = async () => {
        const isValid: boolean = await handleCheckIfJwtValid();
        if (isValid) {
          setJwt(jwtInSecureStore);
          apiService.initializeJwt(jwtInSecureStore);
        } else {
          await SecureStore.deleteItemAsync("jwt");
          setJwt(null);
        }
      };
      checkJwt();
    }
    }

    const showServerDownAlert = () => {
      Alert.alert(
        'Sunucuya Bağlanılamadı',
        'Sunucu bakımda olabilir. Lütfen en yakın zamanda tekrar deneyiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false }
      );
    };

    const checkIfServerIsUp = async () => {
      try {
        await apiService.get('/system/ping', {
          timeout: 5000, // 1 saniye timeout
        });
        // Sunucu cevap verdi, hiçbir şey yapma
      } catch (error) {
        showServerDownAlert();
      }
    };

    checkIfServerIsUp();
    handleJwtRegisteration();
    
    SystemUI.setBackgroundColorAsync(colorScheme === 'dark' ? '#000000' : '#ffffff');
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar translucent backgroundColor="transparent" style={statusBarStyle} />
      
      <View style={{ flex: 1, paddingTop: statusBarPaddingTop }}>
        <Tabs>
          <Tabs.Screen
            name="(tabs)/(home)"
            options={{
              headerShown: false,
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(tabs)/(profile)"
            options={{
              headerShown: false,
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen name="auth" options={{ href: null, headerShown: false }} />
          <Tabs.Screen name="(tabs)/+not-found" options={{ href: null }} />
          <Tabs.Screen name="products" options={{ href: null }} />
          <Tabs.Screen name="cart" options={{ href: null , headerShown:false}} />
          <Tabs.Screen name="(tabs)/products" options={{ href: null , headerShown:false}} />
        </Tabs>
      </View>
    </ThemeProvider>
  );
}
