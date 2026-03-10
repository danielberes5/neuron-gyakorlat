import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CartItemRow from "./CartItemRow"
import type { CartItem } from "./types"

const CartPage = () => {

  const [items,setItems] = useState<CartItem[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    loadCart()
  },[])

  const loadCart = () => {

    const data = JSON.parse(
      localStorage.getItem("cart") || "[]"
    )

    setItems(data)
  }

  const updateQuantity = (
    index:number,
    quantity:number
  ) => {

    const updated = [...items]

    updated[index].quantity = quantity

    setItems(updated)

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    )
  }

  const removeItem = (index:number) => {

    const updated = items.filter(
      (_,i)=>i!==index
    )

    setItems(updated)

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    )
  }

  const total = items.reduce(
    (sum,i)=>sum + i.price * i.quantity,
    0
  )

  const order = () =>{
    navigate("/webshop/order")
  }

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Kosár
      </h2>

      {items.length === 0 && (
        <p>A kosár üres.</p>
      )}

      {items.map((item,index)=>(
        <CartItemRow
          key={index}
          item={item}
          index={index}
          onQuantityChange={updateQuantity}
          onRemove={removeItem}
        />
      ))}

      {items.length > 0 && (

        <div className="mt-6">

          <h3 className="text-xl font-bold">
            Összesen: {total} Ft
          </h3>

          <button
            onClick={order}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Megrendelem
          </button>

        </div>

      )}

    </div>
  )
}

export default CartPage