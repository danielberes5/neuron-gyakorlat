import { useEffect, useState } from "react"
import ApiClient from "../../../api/ApiClient"
import OrdersTable from "./OrdersTable"
import OrderFilters from "./OrderFilters"
import OrderDetailsModal from "./OrderDetailsModal"
import type { Order } from "./types"

const OrdersPage = () => {

  const [orders,setOrders] = useState<Order[]>([])
  const [filtered,setFiltered] = useState<Order[]>([])
  const [selected,setSelected] = useState<Order | null>(null)

  const loadOrders = async () => {
    const res = await ApiClient.get("/orders")
    setOrders(res.data)
    setFiltered(res.data)
  }

  useEffect(()=>{
    loadOrders()
  },[])

  const handleFilter = (
    status:string,
    from:string,
    to:string
  ) => {

    let data = [...orders]

    if(status){
      data = data.filter(o=>o.status === status)
    }

    if(from){
      data = data.filter(
        o => new Date(o.createdAt) >= new Date(from)
      )
    }

    if(to){
      data = data.filter(
        o => new Date(o.createdAt) <= new Date(to)
      )
    }

    setFiltered(data)
  }

  const updateStatus = async (
    id:number,
    status:string
  ) => {

    await ApiClient.put(
      `/orders/${id}/status?status=${status}`
    )

    loadOrders()
  }

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Megrendelések
      </h2>

      <OrderFilters
        onFilter={handleFilter}
      />

      <OrdersTable
        orders={filtered}
        onDetails={setSelected}
        onStatusChange={updateStatus}
      />

      {selected && (
        <OrderDetailsModal
          order={selected}
          onClose={()=>setSelected(null)}
        />
      )}

    </div>

  )
}

export default OrdersPage