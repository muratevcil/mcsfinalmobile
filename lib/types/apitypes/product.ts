export interface MainPageEachProductProps{
    key:number;
    productUuid:string;
    productName:string;
    productMediaURLs:string[];
    productSellerName:string;
    productReviewScore:number;
    productSellerUuid:string;
    productPrice:number;
}

export interface PaginatedMainPageResponse{
    content:MainPageEachProductProps[];
    pageable:any;
    totalPages:number;
    size:number;
    number:number;
}