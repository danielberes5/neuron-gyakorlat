export interface Product {
  id: number;
  name: string;
}

export interface ReceiptItem {
  product: Product;
  quantity: number;
}

export interface Receipt {
  id?: number;
  receiptNumber: string;
  createdAt: string;
  items: ReceiptItem[];
}