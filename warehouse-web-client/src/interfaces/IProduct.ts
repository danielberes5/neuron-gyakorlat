export interface IProduct {
  id?: number;
  name: string;
  category: { id: number; name: string };
  quantityUnit: string;
  unit: { id: number; name: string };
  purchasePrice: number;
  sellingPrice: number;
  description: string;
}
