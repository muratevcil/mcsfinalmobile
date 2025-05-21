import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Alert, FlatList } from 'react-native';
import { EditProduct } from '../../../../lib/types/apitypes/EditProduct';
import { apiService } from '../../../../lib/api';
import { useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const ProductEditScreen: React.FC = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<EditProduct | null>(null);
  const [mediaInput, setMediaInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [stockInput, setStockInput] = useState('');

  useEffect(() => {
    if (productId) {
      fetchProductData(productId);
    }
  }, [productId]);

  const fetchProductData = async (uuid: string) => {
    try {
      const response: EditProduct = (await apiService.getProductDetailsByUuid(uuid)).response;
      setProduct(response);
      setPriceInput(response.productPrice?.toString() || '');
      setStockInput(response.productStockQuantity?.toString() || '');
    } catch (error) {
      Alert.alert('Hata', 'Ürün bilgisi alınamadı');
    }
  };

  const updateProduct = async () => {
    try {
      if (!product) return;
      await apiService.updateProduct(product); // Güncelleme fonksiyonunu burada kullan
      Alert.alert('Başarılı', 'Ürün güncellendi');
    } catch (error) {
      Alert.alert('Hata', 'Ürün güncellenemedi');
    }
  };

  const addMediaUrl = () => {
    if (mediaInput.trim()) {
      setProduct((prev) =>
        prev
          ? {
              ...prev,
              productImgUrl: [...(prev.productImgUrl || []), mediaInput.trim()],
            }
          : prev
      );
      setMediaInput('');
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Ürün İsmi</Text>
      <TextInput
        style={styles.input}
        value={product.productName || ''}
        onChangeText={(text) => setProduct({ ...product, productName: text })}
        placeholder="Ürün adı"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        style={styles.input}
        value={product.productDescription || ''}
        onChangeText={(text) => setProduct({ ...product, productDescription: text })}
        placeholder="Ürün açıklaması"
        placeholderTextColor="#ccc"
        multiline
      />

      <Text style={styles.label}>Birim Fiyatı (₺)</Text>
      <TextInput
        style={styles.input}
        value={priceInput}
        onChangeText={(text) => {setProduct({ ...product, productPrice: Number(text) });setPriceInput(text)}}
        placeholderTextColor="#ccc"
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Stok Miktarı</Text>
      <TextInput
        style={styles.input}
        value={stockInput}
        onChangeText={(text) => {setProduct({ ...product, productStockQuantity: Number(text) });setStockInput(text)}}
        placeholder="Stok adedi"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Medya URL’leri</Text>
      <FlatList
        data={product.productImgUrl || []}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <Text style={styles.mediaItem}>{item}</Text>}
      />
      <View style={styles.mediaInputRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          value={mediaInput}
          onChangeText={setMediaInput}
          placeholder="Medya URL'si"
          placeholderTextColor="#ccc"
        />
        <Button title="Ekle" onPress={addMediaUrl} />
      </View>

      <Button title="Ürünü Güncelle" onPress={()=>{updateProduct()}} color="#fff" />
    </ScrollView>
  );
};

export default ProductEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#005ecb',
    color: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  mediaInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mediaItem: {
    color: '#fff',
    marginBottom: 4,
    textDecorationLine: 'underline',
  },
});
