import { create } from "zustand";

interface cartItems{

    productUuid : string | null;
    productMediaUrls:string[]|null;
    productName:string | null;
    productDescription:string|null;
    productQuantity:number|null;

}

interface CartState {
    cartItems : cartItems[] | null;
    cartItemsCount : number;
    cartItemsTotalPrice:number;
    addcartItems : (cartItems : cartItems | null) => void;
    removecartItems : (itemUuid : string | null) => void;
    emptyCart : () => void;
    setCartItemsCount : (count:number) => void;
    setCartItemsTotalPrice: (totalPrice:number) => void;
  }
  
  export const useCartStore = create<CartState>((set,get) => ({
    cartItems: null,
    cartItemsCount: 0,
    cartItemsTotalPrice:0
    ,
    addcartItems: (cartItemsToAdd) => {
        if (!cartItemsToAdd) return;
        const currentCart = get().cartItems;
        if (currentCart === null) {
        set({ cartItems: [cartItemsToAdd] , cartItemsCount : 1});
        } else {
        set({ cartItems: [...currentCart, cartItemsToAdd] , cartItemsCount : currentCart.length + 1});
        }

    },

    removecartItems: (productUuidToRemove) => {
        const currentCart = get().cartItems;
        if (!currentCart) return;
    
        const updatedCart = currentCart.filter(
          (item) => item.productUuid !== productUuidToRemove
        );
    
        set({
          cartItems: updatedCart.length > 0 ? updatedCart : null,
          cartItemsCount: updatedCart.length
        });
      },

    emptyCart: () => {
        set({ cartItems: null });
    },
    setCartItemsCount: (count)=>{
        set({cartItemsCount:count})
    },
    setCartItemsTotalPrice:(totalPrice)=> {
      set({cartItemsTotalPrice:totalPrice});
    },
  }));
  