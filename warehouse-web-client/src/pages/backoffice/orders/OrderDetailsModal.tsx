import type { Order } from "./types"

interface Props{
  order:Order
  onClose:()=>void
}

const OrderDetailsModal = ({
  order,
  onClose
}:Props) => {

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 w-96">

        <h3 className="text-xl font-bold mb-3">
          Rendelés #{order.id}
        </h3>

        <p>Név: {order.customerName}</p>
        <p>Cím: {order.address}</p>
        <p>Fizetés: {order.paymentMethod}</p>
        <p>Szállítás: {order.shippingMethod}</p>

        <h4 className="mt-3 font-bold">
          Tételek
        </h4>

        {order.items.map(i => (

          <div key={i.id} className="border-b py-1">

            {i.offer.product.name}  
            ({i.quantity} db)

          </div>

        ))}

        <button
          onClick={onClose}
          className="mt-4 bg-gray-600 text-white px-3 py-1"
        >
          Bezár
        </button>

      </div>

    </div>

  )

}

export default OrderDetailsModal