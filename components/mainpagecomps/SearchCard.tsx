import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";



const SearchCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="search-outline" size={26} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});

export default SearchCard;
