import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Router, useRouter } from "expo-router";
import UserCard from "./CartCard";
import CartIcon from "./CartCard";
import CartCard from "./CartCard";
import NotificationsCard from "./NotificationsCard";
import SearchCard from "./SearchCard";
import FavoritesCard from "./FavoritesCard";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/store/useAuthStore";
import { apiService } from "../../lib/api";
import { CartItemCountResponse } from "../../lib/types/apitypes/CartItemCountReponse";
import GeneralAPIType from "../../lib/types/GeneralAPIType";
import { useCartStore } from "../../hooks/store/useCartStore";
import { useFavoritesStore } from "../../hooks/store/useFavoritesStore";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
interface MaingPageHeaderProps{
    jwt:string
}


export function MainPageHeader({jwt:string}:MaingPageHeaderProps){
    const router = useRouter();
    const { jwt } = useAuthStore();
    const setCartItemsCount = useCartStore((state)=>state.setCartItemsCount);
    const setFavoritedItemsCount = useFavoritesStore((state)=>state.setFavoritedItemsCount);

    const handleGetCartItemCountAndFavoritesCount = async()=>{
        const cartItemCountResponse:GeneralAPIType<number>= await apiService.getCartItemCount();
        const favoritedItemsCount:GeneralAPIType<number>= await apiService.getFavoritedItemCount();
        setFavoritedItemsCount(favoritedItemsCount.response);
        setCartItemsCount(cartItemCountResponse.response);
      }

    useFocusEffect(
      useCallback(() => {
        handleGetCartItemCountAndFavoritesCount();
      }, [])
    );

    useEffect(()=>{
    
      handleGetCartItemCountAndFavoritesCount();
    },[]);



    return(
        <View style={styles.mainPageHeaderContainer}>
            <Image source={require('../../assets/images/mainlogo.png')} style={{height:'50%',width:'30%'}}></Image>
            <View style={styles.headerLogos}>
              <NotificationsCard></NotificationsCard>
              <SearchCard></SearchCard>
              <FavoritesCard></FavoritesCard>
              <CartCard></CartCard>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    mainPageHeaderContainer: {
      height: '10%',
      width: '100%',
      backgroundColor: 'blue',
  
      flexDirection: 'row', // yatay hizalama
      justifyContent: 'space-between', // biri sola, biri sağa
      alignItems: 'center', // dikey ortalama
      paddingHorizontal: '5%' // içten boşluk
    },
    mainPageLogo: {
      fontSize: 12,
      fontFamily: 'Arial',
      color: 'white',
    },
    mainPageWelcomeText: {
      color: 'white',
      textAlign: 'right',
      fontSize:12,
      alignItems:'center'
    },
    loginText: {
      color: 'aqua',
      
    },
    headerLogos:{
      width:'60%',
      height:'50%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    }
  });
