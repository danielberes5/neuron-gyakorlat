import { useState } from "react"
import type { Offer } from "./types"

interface Props{
  offer:Offer
}

const OfferCard = ({offer}:Props) => {

  const [quantity,setQuantity] = useState(1)

  const addToCart = () => {

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    )

    cart.push({
      offerId:offer.id,
      quantity
    })

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

    alert("Kosárba téve!")
  }

  return (
    <div className="border rounded p-4 shadow">

      <h3 className="font-bold text-lg">
        {offer.product.name}
      </h3>

      <p className="text-gray-500">
        {offer.product.category.name}
      </p>

      <p className="text-xl mt-2">
        {offer.price} Ft
      </p>

      <div className="flex gap-2 mt-3">

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e=>setQuantity(Number(e.target.value))}
          className="border p-1 w-16"
        />

        <button
          onClick={addToCart}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Kosárba
        </button>

      </div>

    </div>
  )
}

export default OfferCard