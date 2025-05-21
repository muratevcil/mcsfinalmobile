// components/GuestUserCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Router, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
export function GuestCard(){
  const navigation = useRouter();

  const handleLoginPress = () => {
    navigation.push('/auth/login'); // Login sayfanızın route ismini buraya yazın
  };

  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>?</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Henüz giriş yapmadınız</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginText}>Giriş yapın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      margin: 12,
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
    },
    textContainer: {
      marginLeft: 12,
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
    },
    loginText: {
      color: '#007BFF',
      marginTop: 4,
    },
  });
  