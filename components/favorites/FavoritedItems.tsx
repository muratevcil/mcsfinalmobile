import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../../lib/api';

const { width } = Dimensions.get('window');

interface FavoritedItemProps {
  productUuid: string;
  title: string;
  description: string;
  mediaUrls: string[]|null;
  initiallyFavorited?: boolean;
}

const FavoritedItems: React.FC<FavoritedItemProps> = ({
  productUuid,
  title,
  description,
  mediaUrls,
  initiallyFavorited = true
}) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(initiallyFavorited);

  const toggleFavorite = async () => {
    setIsFavorited(prev => !prev);
    if(!isFavorited){
      await apiService.addItemToFavorites({"productUuid":productUuid})
    }
    else{
      await apiService.removeItemFromFavorites(productUuid);
    }
    // Favori durumu backend'e sayfadan çıkarken güncellenecek
  };

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={25}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{description}</Text>
      <FlatList
        data={mediaUrls}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E3A8A', // mavi ton
    padding: 16,
    borderRadius: 12,
    marginVertical: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    color: '#FFFFFF',
    marginVertical: 8,
    fontSize: 14
  },
  slider: {
    marginTop: 10
  },
  image: {
    width: width * 0.7,
    height: 200,
    borderRadius: 10,
    marginRight: 10
  }
});

export default FavoritedItems;
