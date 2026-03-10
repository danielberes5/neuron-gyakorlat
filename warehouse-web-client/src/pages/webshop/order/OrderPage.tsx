import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiClient from "../../../api/ApiClient"
import type { CartItem, OrderRequest } from "./types"

const OrderPage = () => {

  const navigate = useNavigate()

  const [customerName,setCustomerName] = useState("")
  const [address,setAddress] = useState("")
  const [paymentMethod,setPaymentMethod] = useState("CASH")
  const [shippingMethod,setShippingMethod] = useState("PICKUP")

  const submitOrder = async () => {

    const cart:CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    )

    if(cart.length === 0){
      alert("A kosár üres")
      return
    }

    const order:OrderRequest = {

      customerName,
      address,
      paymentMethod,
      shippingMethod,

      items: cart.map(i => ({
        offer:{ id:i.offerId },
        quantity:i.quantity
      }))
    }

    try{

      await ApiClient.post("/orders",order)

      localStorage.removeItem("cart")

      alert("A rendelés sikeresen elküldve!")

      navigate("/webshop/offers")

    }catch(err){

      alert("Hiba történt a rendelés során")

    }

  }

  return (

    <div className="p-6 max-w-xl">

      <h2 className="text-2xl font-bold mb-4">
        Megrendelés
      </h2>

      <div className="flex flex-col gap-3">

        <input
          placeholder="Név"
          value={customerName}
          onChange={e=>setCustomerName(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Szállítási cím"
          value={address}
          onChange={e=>setAddress(e.target.value)}
          className="border p-2"
        />

        <label>Fizetési mód</label>

        <select
          value={paymentMethod}
          onChange={e=>setPaymentMethod(e.target.value)}
          className="border p-2"
        >
          <option value="CASH">
            Készpénz
          </option>

          <option value="BANK_TRANSFER">
            Banki átutalás
          </option>
        </select>

        <label>Szállítási mód</label>

        <select
          value={shippingMethod}
          onChange={e=>setShippingMethod(e.target.value)}
          className="border p-2"
        >
          <option value="PICKUP">
            Személyes átvétel
          </option>

          <option value="COURIER">
            Futár
          </option>
        </select>

        <button
          onClick={submitOrder}
          className="mt-4 bg-green-600 text-white p-2 rounded"
        >
          Megrendelés
        </button>

      </div>

    </div>

  )

}

export default OrderPage