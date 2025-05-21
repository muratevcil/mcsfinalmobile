import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { apiService } from '../../../lib/api';
import { Categories } from '../../../components/mainpagecomps/Categories';
import { CategoryComponentProps } from '../../../lib/types/componenttypes/mainpage/CategoryComponentProps';
import { useAuthStore } from '../../../hooks/store/useAuthStore';
import { MainPageHeader } from '../../../components/mainpagecomps/MainPageHeader';
import { MainPageHeaderForGuest } from '../../../components/mainpagecomps/MainPageHeaderForGuest';
import { useFocusEffect } from 'expo-router';
import MainPageProducts from '../../../components/mainpagecomps/MainPageProducts';
import { MainPageEachProductProps, PaginatedMainPageResponse } from '../../../lib/types/apitypes/product';
import GeneralAPIType from '../../../lib/types/GeneralAPIType';

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryComponentProps[] | null>(null); 
  const [products, setProducts] = useState<MainPageEachProductProps[]>([]);
  const { jwt } = useAuthStore();
  const [page, setPage] = useState<number>(1);
  const [maxPageNumber,setMaxPageNumber] = useState<number>(0);
  const [response,setResponse] = useState<any>(null);
  const pageElementSize = 10;
  // Bunu istediğin yerden değiştirebilirsin

  const fetchCategories = async () => {
    const response = await apiService.fetchAllCategories();
    setCategories(response);
  };

  const handleGetMainPageProducts = async() =>{
    const response:GeneralAPIType<PaginatedMainPageResponse> = (await apiService.getPaginatedMainPageProducts(4,page-1));
    setProducts(response.response.content);
    setMaxPageNumber(response.response.totalPages);
    setResponse(response);
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      handleGetMainPageProducts();
      products.forEach(eachProduct=>{
        console.log(eachProduct.productMediaURLs);
      })
    }, [])
  );

  useEffect(()=>{

    handleGetMainPageProducts();

  },[page]);


  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setPage((prev) => (prev < maxPageNumber ? prev + 1 : maxPageNumber));
  };

  const handleSetPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {jwt ? <MainPageHeader jwt={jwt} /> : <MainPageHeaderForGuest />}
      <Categories categories={categories} />
      <Text style={{fontSize:20,
    color:'aqua',
    alignSelf:'center',
    justifyContent:'center',
    paddingTop:'10%'}}>Available Products</Text>
      <MainPageProducts products={products} />

      {/* Sayfa Geçiş Barı */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage} style={styles.pageButton}>
          <Text style={styles.pageButtonText}>←</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pageNumbersRow}>
            {/* Başta 1 ve ... */}
            {page > 3 && (
              <>
                <TouchableOpacity
                  onPress={() => handleSetPage(1)}
                  style={styles.pageNumberButton}
                >
                  <Text style={styles.pageNumberText}>1</Text>
                </TouchableOpacity>
                {page > 4 && <Text style={styles.ellipsisText}>...</Text>}
              </>
            )}

            {/* Ortadaki aktif sayfa ve çevresi */}
            {Array.from({ length: maxPageNumber }).map((_, index) => {
              const pageNumber = index + 1;
              if (Math.abs(pageNumber - page) > 2) return null;

              const isActive = pageNumber === page;
              return (
                <TouchableOpacity
                  key={pageNumber}
                  onPress={() => handleSetPage(pageNumber)}
                  style={[
                    styles.pageNumberButton,
                    isActive && styles.activePageButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.pageNumberText,
                      isActive && styles.activePageText,
                    ]}
                  >
                    {pageNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Sonda ... ve maxPageNumber */}
            {page < maxPageNumber - 2 && (
              <>
                {page < maxPageNumber - 3 && <Text style={styles.ellipsisText}>...</Text>}
                <TouchableOpacity
                  onPress={() => handleSetPage(maxPageNumber)}
                  style={styles.pageNumberButton}
                >
                  <Text style={styles.pageNumberText}>{maxPageNumber}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity onPress={handleNextPage} style={styles.pageButton}>
          <Text style={styles.pageButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: '25%',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  pageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  pageButtonText: {
    color: 'white',
    fontSize: 18,
  },
  pageNumbersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumberButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  activePageButton: {
    backgroundColor: '#007BFF',
  },
  pageNumberText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activePageText: {
    color: 'white',
  },
  ellipsisText: {
    marginHorizontal: 4,
    color: '#666',
    fontSize: 16,
  },
});
