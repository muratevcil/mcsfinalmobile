import { LoginRequest } from './types/apitypes/auth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { CartItemCountResponse } from './types/apitypes/CartItemCountReponse';
import GeneralAPIType from './types/GeneralAPIType';
import { CartItem, IncrementOrDecrementCartItemRequest, IncrementOrDecrementCartItemResponse } from './types/apitypes/CartItem';
import { AddToFavoritesItemRequest, FavoritedItem } from './types/apitypes/FavoritedItem';
import { MainPageEachProductProps, PaginatedMainPageResponse } from './types/apitypes/product';
import { SellerProduct } from './types/apitypes/SellerProducts';
import { EditProduct } from './types/apitypes/EditProduct';
import { UnknownOutputParams } from 'expo-router';
import { UserDetails } from './types/apitypes/UserDetails';

export class ApiService {
  private axiosInstance: AxiosInstance;
  private jwt: string | null = null;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.116.94:8080/v1",
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }

  private initializeRequestInterceptor(token: string | null) {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  private initializeRequestInterceptorWithNoHeaders() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers["Authorization"] = `Bearer no-header`;
        return config;
      }

    ),
      (error: any) => Promise.reject(error);
  }

  public initializeJwt(jwt: string | null) {
    this.jwt = jwt;
    this.initializeRequestInterceptor(jwt);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  // Buraya custom API metodları da yazabilirsin:
  public async login(username: string, password: string): Promise<string> {
    return this.post('/auth/generateToken', { "username": username, "password": password });
  }

  public async fetchProducts(): Promise<any[]> {
    return this.get('/products');
  }

  public async fetchAllCategories(): Promise<any[]> {
    return this.get('/category/getAll');
  }

  public async checkIfJwtIsValid(jwt: string): Promise<boolean> {
    return this.post('/auth/checkIfJwtValid', { "jwt": jwt });
  }

  public async getAllProducts(): Promise<GeneralAPIType<any[]>> {
    return this.get('/products/getAllProducts')
  }

  public async getCartItemCount(): Promise<GeneralAPIType<number>> {
    return this.get('/cart/getCartItemCount');
  }

  public async getFavoritedItemCount(): Promise<GeneralAPIType<number>> {
    return this.get('/favorites/getFavoritesCount');
  }

  public async getFavoritedItemsContent(): Promise<GeneralAPIType<FavoritedItem[]>> {
    return this.get('/favorites/getFavoritedProducts');
  }

  public async removeItemFromFavorites(productToRemoveUuid: string): Promise<GeneralAPIType<string>> {
    return this.delete(`/favorites/removeFavoritedProduct/${productToRemoveUuid}`);
  }

  public async addItemToFavorites(addToFavoritesItemRequest: AddToFavoritesItemRequest): Promise<GeneralAPIType<any>> {
    return this.post('/favorites/addToFavorites', addToFavoritesItemRequest);
  }

  public async checkIfServerIsUp(): Promise<any[]> {
    return this.get('/system/ping');
  }

  public async getCartItemContent(): Promise<GeneralAPIType<CartItem[]>> {
    return this.get('/cart/getCartContent');
  }

  public async getCartTotalPrice(): Promise<GeneralAPIType<number>> {
    return this.get('/cart/getCartTotalPrice');
  }

  public async incrementOrDecrementCartItem(incrementOrDecrementCartItemRequest: IncrementOrDecrementCartItemRequest): Promise<IncrementOrDecrementCartItemResponse> {
    return this.post('/cart/incrementOrDecrementItemCount', incrementOrDecrementCartItemRequest);
  }

  public async removeCartItem(productUuid: string): Promise<GeneralAPIType<string>> {
    return this.delete(`/cart/removeCartItem/${productUuid}`);
  }

  public async getPaginatedMainPageProducts(size: number, page: number): Promise<GeneralAPIType<PaginatedMainPageResponse>> {
    return this.get(`/product/getMainPageProducts?size=${size}&page=${page}`);
  }

  public async getUserRole(): Promise<GeneralAPIType<string[]>> {
    return this.get(`/auth/getUserRole`);
  }

  public async getSellerProducts(): Promise<GeneralAPIType<SellerProduct[]>> {
    return this.get(`/product/getSellerProducts`);
  }

  public async getProductDetailsByUuid(productUuid: string | UnknownOutputParams): Promise<GeneralAPIType<EditProduct>> {
    return this.get(`/product/getProductByUUID/${productUuid}`);
  }

  public async updateProduct(editProduct: EditProduct) {
    return this.post(`/product/editProduct`, editProduct);
  }

  public async addItemToCart(productUuid:string,productQuantity:number){
    return this.post("/cart/addItemToCart",{productUuid,productQuantity});
  }

  public async getUserDetails():Promise<GeneralAPIType<UserDetails>>{
    return this.get("/auth/getUserDetails");
  }

}

export const apiService = new ApiService();

