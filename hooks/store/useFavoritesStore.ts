import { create } from "zustand";

interface FavoritedItem{

    productUuid : string | null;
    productMediaUrls:string[]|null;
    productName:string | null;
    productDescription:string|null;

}

interface FavoritesState {
    favorites : FavoritedItem[] | null;
    favoritesCount : number;
    addFavoritedItem : (cartItem : FavoritedItem | null) => void;
    removeFavoritedItem : (favoritedUuidToRemove : string | null) => void;
    setFavoritedItemsCount : (count:number)=>void;
    emptyFavoritedItems : () => void;

  }
  
  export const useFavoritesStore = create<FavoritesState>((set,get) => ({
    favorites : null,
    favoritesCount:0,
    addFavoritedItem : (favoritedItemToAdd)=>{
        if (!favoritedItemToAdd) return;
        const currentCart = get().favorites;
        if (currentCart === null) {
        set({ favorites: [favoritedItemToAdd] , favoritesCount : 1});
        } else {
        set({ favorites: [...currentCart, favoritedItemToAdd] , favoritesCount : currentCart.length + 1});
        }
    },
    removeFavoritedItem : (favoritedUuidToRemove)=>{
        const currentCart = get().favorites;
        if (!currentCart) return;
    
        const updatedCart = currentCart.filter(
          (item) => item.productUuid !== favoritedUuidToRemove
        );
    
        set({
          favorites: updatedCart.length > 0 ? updatedCart : null,
          favoritesCount: updatedCart.length
        });
    },
    emptyFavoritedItems : ()=>{

    },
    setFavoritedItemsCount:(count)=>{
        set({favoritesCount:count})
    }
  }));
  