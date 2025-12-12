import type { IProduct } from "./IProduct";

export interface IProductsResponse {
  content: IProduct[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
