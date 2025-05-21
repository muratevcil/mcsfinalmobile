import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCartStore } from "../../hooks/store/useCartStore";
interface CartIconProps {
  itemCount: number;
}

const CartCard = () => {
  const router = useRouter();
  const itemCount = useCartStore();
  const { cartItemsCount } = useCartStore();

  const goToCart = () => {
    router.push("/(tabs)/(home)/cart");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToCart}>
      <Ionicons name="cart-outline" size={30} color="#ffffff" />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  badge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "#00BFFF", // açık mavi
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CartCard;
