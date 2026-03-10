export interface Product {
  id: number
  name: string
}

export interface Offer {
  id?: number
  product: Product
  price: number
  validFrom: string
  validTo: string
}