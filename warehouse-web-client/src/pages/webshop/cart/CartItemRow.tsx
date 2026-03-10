import type { CartItem } from "./types"

interface Props{
  item:CartItem
  index:number
  onQuantityChange:(index:number,quantity:number)=>void
  onRemove:(index:number)=>void
}

const CartItemRow = ({
  item,
  index,
  onQuantityChange,
  onRemove
}:Props) => {

  return (

    <div className="flex items-center gap-4 border-b py-2">

      <div className="flex-1">
        {item.productName}
      </div>

      <div>
        {item.price} Ft
      </div>

      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e =>
          onQuantityChange(
            index,
            Number(e.target.value)
          )
        }
        className="border p-1 w-16"
      />

      <div className="w-24">
        {item.price * item.quantity} Ft
      </div>

      <button
        onClick={()=>onRemove(index)}
        className="text-red-600"
      >
        Törlés
      </button>

    </div>

  )
}

export default CartItemRow