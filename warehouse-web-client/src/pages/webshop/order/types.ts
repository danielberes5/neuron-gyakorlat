export interface CartItem {
  offerId: number
  productName: string
  price: number
  quantity: number
}

export interface OrderRequest {
  customerName: string
  address: string
  paymentMethod: string
  shippingMethod: string
  items: {
    offer: { id: number }
    quantity: number
  }[]
}