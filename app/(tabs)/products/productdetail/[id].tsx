import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { apiService } from "../../../../lib/api";

const { width } = Dimensions.get("window");

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const params = useLocalSearchParams<{ id: string }>();
  const productUuid = params.id;

  const handleAddProductToFavorites = async()=>{
    await apiService.addItemToFavorites({productUuid:productUuid});
  }

  const handleRemoveProductFromFavorites = async ()=>{
    await apiService.removeItemFromFavorites(productUuid);
  }

  const handleAddProductToCart = async()=>{
    await apiService.addItemToCart(productUuid,1);
  }

  const handleRemoveProductFromCart = async () =>{
    await apiService.removeCartItem(productUuid);
  }


  const handleGetProductDetails = async () =>{
    const response:any = (await apiService.getProductDetailsByUuid(productUuid)).response;
    setProduct(response);
    console.log(response);
  }

  useEffect(() => {


    handleGetProductDetails();

    setComments([
      { user: "Ali", comment: "Harika bir ürün!" },
      { user: "Ayşe", comment: "Fiyat performans ürünü." },
    ]);
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if(isFavorite){
      handleAddProductToFavorites()
    }
    else if(!isFavorite){
      handleRemoveProductFromFavorites();
    }
  };

  const addToCart = () => {
    handleAddProductToCart();
    console.log("Sepete eklendi:", product.productName);
  };

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Ürün Kartı (Görseller + Bilgiler bir arada) */}
        <View
          style={{
            backgroundColor: "#005BBB",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ height: 200, marginBottom: 16 }}
          >
            {(product.productMediaURLs || []).map((uri: string, index: number) => (
              <Image
                key={index}
                source={{ uri }}
                style={{
                  width: width - 64,
                  height: 200,
                  borderRadius: 12,
                  marginRight: 8,
                }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
              {product.productName}
            </Text>
            <TouchableOpacity onPress={()=>{toggleFavorite()}}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 20, color: "white", marginTop: 8 }}>
            {product.productPrice}₺
          </Text>
          <Text style={{ fontSize: 16, color: "white", marginTop: 4 }}>
            ⭐ {product.productReviewScore}/5
          </Text>

          <Text style={{ color: "white", marginTop: 12 }}>
            {product.productDescription}
          </Text>

          <TouchableOpacity
            onPress={()=>{addToCart()}}
            style={{
              backgroundColor: "white",
              padding: 12,
              borderRadius: 12,
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Sepete Ekle</Text>
          </TouchableOpacity>
        </View>

        {/* Yorumlar */}
        <Text
          style={{
            fontSize: 18,
            color: "white",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          Yorumlar
        </Text>
        <FlatList
          data={comments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#005BBB",
                padding: 12,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item.user}
              </Text>
              <Text style={{ color: "white" }}>{item.comment}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
