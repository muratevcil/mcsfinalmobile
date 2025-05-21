import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { apiService } from '../../lib/api';
import { useAuthStore } from '../../hooks/store/useAuthStore';
import * as SecureStore from 'expo-secure-store';
export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 
  const { isAuthenticated } = useAuth();
  const setJwt = useAuthStore((state)=>state.setJwt)
  const handleLogin = async () => {
    // TODO: Backend'den kullanıcı kontrolü yapılacak
    if (email && password) {
      const jwt = await apiService.login(email,password);
      Alert.alert("Bilgi",jwt);
      if (jwt) {
        await SecureStore.setItemAsync("jwt", jwt);
        setJwt(jwt);
        apiService.initializeJwt(jwt);
        router.replace('/(tabs)/(home)');
      } else {
        Alert.alert('Hata', 'Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
      }
    } else {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginHeader}> Giriş Yap</Text>

      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => router.push('/auth/forgot')}>
        <Text style={styles.forgotText}>Şifremi unuttum</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/auth/register')}>
        <Text style={styles.registerText}>Bir Hesabın Yok mu ? Kayıt ol</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', // İçeriği üstten başlayacak şekilde yerleştir
    paddingHorizontal: 24,
    paddingTop: 0, // paddingTop kaldırıldı
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    color:'white',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '100%', // Tam genişlik
  },
  forgotText: {
    fontSize:16,
    color: 'white',
  },
  loginButton:{
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: 'blue',
    width:'40%', // Tam genişlik
    height:'auto',
    alignSelf:'center',
    marginTop:'10%'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerButton:{
    marginTop:'10%'
  },
  registerText: {
    color: 'blue',
    fontWeight: 'bold',
    alignSelf:'center'
  },
  loginHeader:{
    color:'white',
    alignSelf:'center',
    marginTop:'35%',
    fontSize:25
  }
});
