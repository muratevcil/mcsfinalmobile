// components/profile/SellerProductList.tsx

import React from 'react';
import { View, FlatList } from 'react-native';
import { SellerProduct } from '../../lib/types/apitypes/SellerProducts';
import SellerProductCard from './SellerProductCard';

interface Props {
  products: SellerProduct[];
}

const SellerProductList: React.FC<Props> = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.productUuid || Math.random().toString()}
      renderItem={({ item }) => <SellerProductCard product={item} />}
    />
  );
};

export default SellerProductList;
