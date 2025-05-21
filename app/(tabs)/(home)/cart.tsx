import { TouchableOpacity, View, Text } from "react-native";
import CartItemsContainer from "../../../components/cart/CartItemsContainer";
import { StyleSheet } from "react-native";
import { useAuthStore } from "../../../hooks/store/useAuthStore";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { CartItem } from "../../../lib/types/apitypes/CartItem";
import { apiService } from "../../../lib/api";
import { useCartStore } from "../../../hooks/store/useCartStore";
export default function CartPage(){
  const { jwt } = useAuthStore();
  const { cartItemsTotalPrice } = useCartStore();
  const [cartTotalPrice,setCartTotalPrice] = useState<number|null>(null);
  useFocusEffect(
      React.useCallback(() => {
        const fetchCartTotalPrice = async () => {
          const cartTotalPrice: number = (await apiService.getCartTotalPrice()).response;
          setCartTotalPrice(cartTotalPrice);
        };
        fetchCartTotalPrice();
  
      }, [])
    );
    return(
      <View style={styles.container}>
      {
        !!jwt ?
          ( 
          <View style={styles.itemContainer}>
            <CartItemsContainer></CartItemsContainer>
            <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Continue To Buy</Text>
                  <Text style={styles.buyButtonPrice}>₺{cartItemsTotalPrice}</Text>
            </TouchableOpacity>
          </View> )
          : (<Text style={styles.youHaveNoAccess}>You have no access to cart menu unless you log in.</Text>)
               
      }
      </View>
        
    )
}

const styles = StyleSheet.create({
    itemContainer:{
      flex:1
    },
    container: {
      flex: 1,              // Tüm ekranı kaplasın
    },
    buyButton: {
        backgroundColor: 'blue',
        height: '10%',
        flexDirection: 'row',         // Yanyana dizmek için
        alignItems: 'center',         // Dikey ortalama
        justifyContent: 'space-between', // Aralarına boşluk koy
        paddingHorizontal: '5%',      // Sağ-sol boşluk için
      },
      buyButtonText: {
        flex:1,
        color: 'white',
        fontSize: 25,
      },
      buyButtonPrice: {
        color: 'white',
        fontSize: 25,
      },
      youHaveNoAccess:{
        color:'white',
      }
  });
