export interface FavoritedItem{
    key:number;
    productUuid:string;
    productMediaURLs:string[]|null;
    productPrice:number;
    productName:string;
    productDescription:string;
    productStockQuantity:number;
    productSellerUserUUID:string;
    createdDate:Date;
    updatedDate:Date;
    productPublished:boolean;
}

export interface AddToFavoritesItemRequest{
    productUuid:string;
}