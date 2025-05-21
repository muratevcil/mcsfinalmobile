// components/CartItemsContainer.tsx
import React, { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import CartItems from './CartItems';
import { TouchableOpacity,Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { apiService } from '../../lib/api';
import { CartItem } from '../../lib/types/apitypes/CartItem';
import { useFocusEffect } from 'expo-router';
import { useAuthStore } from '../../hooks/store/useAuthStore';
import { useCartStore } from '../../hooks/store/useCartStore';


export default function CartItemsContainer () {
  const [cartItemList,setCartItemList] = useState<CartItem[]|null>(null);
  const { jwt } = useAuthStore();
  const setCartItemsTotalPrice = useCartStore((state)=>state.setCartItemsTotalPrice);

  const fetchCartItems = async () => {
        const cartItemList: CartItem[] = (await apiService.getCartItemContent()).response;
        setCartItemList(cartItemList);
      };


  const fetchCartTotalPrice = async () => {
        const cartTotalPrice: number = (await apiService.getCartTotalPrice()).response;
        setCartItemsTotalPrice(cartTotalPrice);
      };
  useFocusEffect(
    React.useCallback(() => { 
      fetchCartTotalPrice();
      fetchCartItems();
      console.log(cartItemList);
    }, [])
  );


  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
        {cartItemList != null && cartItemList.length > 0 ? (
          cartItemList.map((item) => (
            <CartItems
              key={item.cartItemId}
              price={item.productPrice}
              image={item.productImgUrl ?? 'https://placehold.co/60'}
              name={item.productName}
              description={item.productDescription}
              quantity={item.productQuantity}
              onIncrease={async () => {
                await apiService.incrementOrDecrementCartItem({
                  jwt:jwt,
                  productUuid:item.productUuid,
                  incrementOrDecrement:true
                });
                fetchCartItems();
                fetchCartTotalPrice();
              }}
              onDecrease={async () => {
                await apiService.incrementOrDecrementCartItem({
                  jwt:jwt,
                  productUuid:item.productUuid,
                  incrementOrDecrement:false
                });
                fetchCartItems();
                fetchCartTotalPrice();
              }}
              onDelete={async () => {
                await apiService.removeCartItem(
                  item.productUuid
                  );
                fetchCartItems();
                fetchCartTotalPrice();
              }}
            />
          ))
        ) : (
          <Text style={styles.noItemsText}>No Items added to cart.</Text>
        )}
    </ScrollView>
        
      
  );
  
};


const styles = StyleSheet.create({
  noItemsText:{
    color:"white",
    alignSelf:'center',
    justifyContent:'center'
  }
})
