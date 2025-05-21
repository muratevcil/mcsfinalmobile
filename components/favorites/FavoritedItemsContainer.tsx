import { useFocusEffect } from "expo-router";
import { View,Text } from "react-native";
import { apiService } from "../../lib/api";
import GeneralAPIType from "../../lib/types/GeneralAPIType";
import { CartItem } from "../../lib/types/apitypes/CartItem";
import { useState } from "react";
import { useCallback } from "react";
import { FavoritedItem } from "../../lib/types/apitypes/FavoritedItem";
import FavoritedItems from "./FavoritedItems";
export default function FavoritedItemsContainer(){

    const [favoritedItems,setFavoritedItems] = useState<FavoritedItem[]|null>(null);

    const handleGetFavoritedItemsContent = async ()=>{
        let key:number = 0;
        const favoritedItemsContent :FavoritedItem[] = (await apiService.getFavoritedItemsContent()).response;
        favoritedItemsContent.forEach(element => {
            element.key = key+1;
            key++;
        });
        setFavoritedItems(favoritedItemsContent);
    }

    useFocusEffect(
          useCallback(() => {
            handleGetFavoritedItemsContent();
          }, [])
    );

    return(
        <View>
            {favoritedItems != null && favoritedItems.length>0 ?
            
            (
                favoritedItems.map((item)=>(
                    <View>
                        <FavoritedItems
                        productUuid={item.productUuid}
                        key={item.key}
                        title={item.productName}
                        description={item.productDescription}
                        mediaUrls={item.productMediaURLs ?? ['https://img.icons8.com/?size=100&id=Vk1hVre0P58T&format=png&color=000000','https://img.icons8.com/?size=100&id=2025&format=png&color=000000','']}>

                        </FavoritedItems>
                    </View>
            
                ))
            ):
            (<Text style={{color:'white'}}>No favorited items has been found.</Text>)}
        </View>
    );
}