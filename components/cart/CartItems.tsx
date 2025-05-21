// components/CartItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CartItemProps {
  image: string|string[];
  name: string;
  description: string;
  quantity: number;
  price: number; // Fiyat bilgisi eklendi
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const CartItems: React.FC<CartItemProps> = ({ image, name, description, quantity, price, onIncrease, onDecrease, onDelete }) => {
  return (
    <View style={styles.container}>
      <Image  source={{ uri: Array.isArray(image) ? image[0] : image }}
  style={styles.image}/>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.controls}>
        {/* Fiyat kısmı */}
        <Text style={styles.price}>{price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            editable={false}
          />

          <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#f00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: 'blue',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
  },
  controls: {
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 16,
    color: 'white',
  },
  quantityInput: {
    width: 32,
    textAlign: 'center',
    marginHorizontal: 6,
    fontSize: 16,
    color: 'white',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8, // Fiyat ile diğer öğeler arasına mesafe ekledik
  },
  deleteButton: {
    marginTop: 6,
  },
});
