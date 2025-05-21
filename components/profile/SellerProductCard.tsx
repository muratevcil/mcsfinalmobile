// components/profile/SellerProductCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SellerProduct } from '../../lib/types/apitypes/SellerProducts';
import { Link } from 'expo-router';

interface Props {
  product: SellerProduct;
}

const SellerProductCard: React.FC<Props> = ({ product }) => {
  return (
    <View style={styles.card}>
        <Link href={`/(tabs)/products/editproduct/${product.productUuid}`}>
      {product.productMediaURLs[0] && (
        <Image source={{ uri: product.productMediaURLs[0] }} style={styles.image} />
      )}
      <Text style={styles.title}>{product.productName}</Text>
      <Text style={styles.description}>{product.productDescription}</Text>

      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default SellerProductCard;
