import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";





const NotificationIcon = () => {

  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="notifications-outline" size={28} color="#ffffff" />
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
  }
});

export default NotificationIcon;
