import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { MainPageEachProductProps } from '../../lib/types/apitypes/product';
import { useRouter } from 'expo-router';

const MainPageEachProduct = ({
  productUuid,
  productName,
  productMediaURLs,
  productReviewScore,
  productSellerName,
  productPrice,
}: MainPageEachProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === productMediaURLs.length - 1 ? 0 : prev + 1
    );
    console.log("Resimler:", productMediaURLs, "Index:", currentImageIndex);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productMediaURLs.length - 1 : prev - 1
    );
  };

  return (
    <View style={styles.productBox}>
      <TouchableOpacity
        onPress={() => {
          router.navigate({
            pathname: '/products/productdetail/[id]',
            params: { id: productUuid },
          });
        }}
      >
        <Image
          key={productMediaURLs[currentImageIndex]}
          source={{ uri: productMediaURLs[currentImageIndex] }}
          style={styles.productImage}
          resizeMode="cover"
          onError={(error) => console.log('Image load error:', error.nativeEvent)}
        />

        <View style={styles.imageNav}>
          <TouchableOpacity onPress={handlePrev}>
            <AntDesign name="leftcircle" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <AntDesign name="rightcircle" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.productName}>Ürün: {productName}</Text>
        <Text style={styles.productSeller}>Satıcı: {productSellerName}</Text>
        <Text style={{ color: 'white' }}>Değerlendirme</Text>

        <View style={styles.stars}>
          {Array.from({ length: 5 }).map((_, index) => {
            if (index + 1 <= Math.floor(productReviewScore)) {
              return (
                <FontAwesome key={index} name="star" size={18} color="yellow" />
              );
            } else if (
              index < productReviewScore &&
              productReviewScore < index + 1
            ) {
              return (
                <FontAwesome
                  key={index}
                  name="star-half-full"
                  size={18}
                  color="yellow"
                />
              );
            } else {
              return (
                <FontAwesome key={index} name="star-o" size={18} color="yellow" />
              );
            }
          })}
        </View>

        <Text style={{ color: 'white' }}>{productReviewScore}</Text>
        <Text style={{ color: 'white' }}>Birim fiyat: ₺{productPrice}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productBox: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    padding: 10,
    margin: 8,
    width: 180, // Sabit genişlik
    alignItems: 'center',
  },
  productImage: {
    width: 160, // Sabit genişlik
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#222', // arka plan vererek debug kolaylaştırma
  },
  imageNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 5,
  },
  productName: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8,
  },
  productSeller: {
    color: 'white',
    fontSize: 12,
  },
  stars: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default MainPageEachProduct;
