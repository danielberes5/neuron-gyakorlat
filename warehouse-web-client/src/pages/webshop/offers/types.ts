export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  category: Category
}

export interface Offer {
  id: number
  product: Product
  price: number
  validFrom: string
  validTo: string
}