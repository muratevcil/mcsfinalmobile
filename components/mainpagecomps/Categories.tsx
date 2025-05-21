import { ScrollView, TouchableOpacity, View } from "react-native";
import { Category }  from "./Category";
import { StyleSheet } from "react-native";
import { CategoryComponentProps } from "../../lib/types/componenttypes/mainpage/CategoryComponentProps";
import { Text } from "react-native";
import { useState } from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
export function Categories({categories}: { categories: CategoryComponentProps[] | null }) {

    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    const onRefresh = () => {
    setRefreshing(true);

    // Burada veriyi yeniden yükle veya bir işlem yap
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // örnek: 2 saniye sonra refresh işlemini bitir
    };

    if (categories === null) {
        return (
        <View>
            <Text>No active category found</Text>
        </View>);
      }

    return (
        
      <>
      <Text style={styles.categoriesHeader}>Categories</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
            {categories.map((category) => (
                <TouchableOpacity onPress={()=>{
                  
                }}>
                  <Category
                      key={category.categoryId}
                      categoryId={category.categoryId}
                      categoryDescription={category.categoryDescription}
                      categoryImgUrl={category.categoryImgUrl}
                      categoryName={category.categoryName}
                      cartCategoryDiscounts={category.cartCategoryDiscounts}/>
                </TouchableOpacity>
            ))}
        </ScrollView></>
    );
  }
  

const styles = StyleSheet.create({
  categoriesHeader:{
    fontSize:20,
    color:'aqua',
    alignSelf:'center',
    justifyContent:'center',
    paddingTop:'10%'
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Öğeleri eşit mesafede hizalayacak
    alignItems: 'center',             // Öğeleri dikeyde ortalayacak
  },
  textWrap:{
    color:'red'
  },
  itemContainer: {
    width: 100,                      // Her bir kutucuk genişliği
    height: 100,                     // Her bir kutucuk yüksekliği
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',      // Kutucukların arka plan rengi
    marginHorizontal: 5,             // Kutucuklar arasındaki yatay boşluk
    borderRadius: 10,                // Köşe yuvarlama
  },
  itemText: {
    color: '#fff',                   // Yazı rengi
    fontSize: 16,                    // Yazı boyutu
    fontWeight: 'bold',
  }
});