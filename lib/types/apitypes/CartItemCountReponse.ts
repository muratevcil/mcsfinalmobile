import GeneralAPIType from "../../types/GeneralAPIType"
interface CartItemCount{

    countOfCartItem:number|null;

}

export type CartItemCountResponse = GeneralAPIType<CartItemCount>;