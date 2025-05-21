export interface EditProduct{
  productUuid:string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStockQuantity: number;
  productImgUrl: string[];
  isProductPublished:boolean;
}