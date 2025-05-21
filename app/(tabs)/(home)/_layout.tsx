import React from 'react';
import { Platform } from 'react-native';
import {Stack} from 'expo-router';
import {Tabs} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function HomeLayout() {


  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}></Stack.Screen>
      <Stack.Screen name='cart' options={{headerShown:true,title:"Cart"}}></Stack.Screen>
      <Stack.Screen name='favorites' options={{headerShown:true,title:"Favorites"}}></Stack.Screen>
      <Stack.Screen name='products' options={{headerShown:false}}></Stack.Screen>
    </Stack>
  );
}
