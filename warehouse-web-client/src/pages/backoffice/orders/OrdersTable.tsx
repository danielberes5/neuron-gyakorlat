import type { Order } from "./types"

interface Props{
  orders:Order[]
  onDetails:(order:Order)=>void
  onStatusChange:(id:number,status:string)=>void
}

const OrdersTable = ({
  orders,
  onDetails,
  onStatusChange
}:Props) => {

  return (

    <table className="w-full border">

      <thead>

        <tr className="bg-gray-100">

          <th>ID</th>
          <th>Név</th>
          <th>Státusz</th>
          <th>Dátum</th>
          <th>Műveletek</th>

        </tr>

      </thead>

      <tbody>

        {orders.map(o => (

          <tr key={o.id} className="border-t">

            <td>{o.id}</td>
            <td>{o.customerName}</td>
            <td>{o.status}</td>
            <td>{o.createdAt}</td>

            <td className="flex gap-2">

              <button
                onClick={()=>onDetails(o)}
                className="text-blue-600"
              >
                Részletek
              </button>

              <select
                value={o.status}
                onChange={e =>
                  onStatusChange(o.id,e.target.value)
                }
                className="border"
              >

                <option value="NEW">NEW</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="INVALID">INVALID</option>
                <option value="SHIPPING">SHIPPING</option>
                <option value="COMPLETED">COMPLETED</option>

              </select>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )

}

export default OrdersTable