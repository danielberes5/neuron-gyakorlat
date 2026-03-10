import { useEffect, useState } from "react"
import ApiClient from "../../../api/ApiClient"
import OfferTable from "./OfferTable"
import OfferModal from "./OfferModal"
import type { Offer, Product } from "./types"

const OffersPage = () => {

  const [offers,setOffers] = useState<Offer[]>([])
  const [products,setProducts] = useState<Product[]>([])
  const [editing,setEditing] = useState<Offer | null>(null)
  const [modalOpen,setModalOpen] = useState(false)

  const [from,setFrom] = useState("")
  const [to,setTo] = useState("")

  const loadOffers = async () => {
    const res = await ApiClient.get("/offers/active")
    setOffers(res.data)
  }

  const loadProducts = async () => {
    const res = await ApiClient.get("/products")
    setProducts(res.data)
  }

  useEffect(()=>{
    loadOffers()
    loadProducts()
  },[])

  const handleFilter = async () => {

    const res = await ApiClient.get("/offers")
    
    const filtered = res.data.filter((o:Offer)=>{

      const start = new Date(o.validFrom)
      const end = new Date(o.validTo)

      if(from && start < new Date(from)) return false
      if(to && end > new Date(to)) return false

      return true
    })

    setOffers(filtered)
  }

  const openCreate = () =>{
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (offer:Offer)=>{
    setEditing(offer)
    setModalOpen(true)
  }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">Ajánlatok</h2>

      {/* szűrő */}
      <div className="flex gap-2 mb-4">

        <input
          type="date"
          value={from}
          onChange={e=>setFrom(e.target.value)}
          className="border p-2"
        />

        <input
          type="date"
          value={to}
          onChange={e=>setTo(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Szűrés
        </button>

        <button
          onClick={openCreate}
          className="bg-green-600 text-white px-3 py-2 rounded ml-auto"
        >
          Hozzáadás
        </button>

      </div>

      <OfferTable
        offers={offers}
        onEdit={openEdit}
      />

      {modalOpen &&
        <OfferModal
          offer={editing}
          products={products}
          onClose={()=>setModalOpen(false)}
          onSaved={loadOffers}
        />
      }

    </div>
  )
}

export default OffersPage