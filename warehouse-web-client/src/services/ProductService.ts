import ApiClient from "./ApiClient";
import type { IProduct } from "../interfaces/IProduct";
import type { IProductsResponse } from "../interfaces/IProductsResponse";


export const getProducts = async (page: number): Promise<IProductsResponse> => {
  const response = await ApiClient.get<IProductsResponse>(`/ProductService/getProducts?page=${page}`);
  return response.data;
};


export const addProduct = async (product: IProduct): Promise<IProduct> => {
  const response = await ApiClient.put<IProduct>("/ProductService/addProduct", product);
  return response.data;
};
