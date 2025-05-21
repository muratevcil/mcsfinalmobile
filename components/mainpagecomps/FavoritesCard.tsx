import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFavoritesStore } from "../../hooks/store/useFavoritesStore";
import { Router, useRouter } from "expo-router";


const FavoritesCard = () => {
  const { favoritesCount } = useFavoritesStore();
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{router.push('/(tabs)/(home)/favorites')}}>
      <Ionicons name="heart-outline" size={26} color="#ffffff" />
      {favoritesCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{favoritesCount}</Text>
              </View>
            )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
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

export default FavoritesCard;
