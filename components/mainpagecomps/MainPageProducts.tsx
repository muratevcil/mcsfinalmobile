import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import MainPageEachProduct from './MainPageEachProduct';
import { MainPageEachProductProps } from '../../lib/types/apitypes/product';

interface MainPageProductsContainerProps {
  products: MainPageEachProductProps[];
}

const MainPageProductsContainer = ({ products }: MainPageProductsContainerProps) => {
  if (!products) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (!products.length) {
    return <Text style={styles.emptyText}>Gösterilecek ürün bulunamadı.</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.productUuid}
      renderItem={({ item }) => (
        <MainPageEachProduct
          productUuid={item.productUuid}
          productName={item.productName}
          productMediaURLs={item.productMediaURLs}
          productReviewScore={item.productReviewScore}
          productSellerName={item.productSellerName}
          productSellerUuid={item.productSellerUuid}
          productPrice={item.productPrice}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default MainPageProductsContainer;
