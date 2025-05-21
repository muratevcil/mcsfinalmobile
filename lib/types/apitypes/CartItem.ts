export interface CartItem{
    cartItemId:number;
    productUuid:string;
    productName:string;
    productDescription:string;
    productImgUrl:string|null;
    productPrice:number;
    productQuantity:number;
    ekbifield:boolean;
}

export interface IncrementOrDecrementCartItemRequest{
    jwt:string|null;
    productUuid:string;
    incrementOrDecrement:boolean; // true : increment, false : decrement
}

export interface IncrementOrDecrementCartItemResponse{
    itemUuid:string;
    newQuantity:number;
}

