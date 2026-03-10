import { useState,useEffect } from "react"
import Select from "react-select"
import ApiClient from "../../../api/ApiClient"
import type { Offer, Product } from "./types"

interface Props{
  offer:Offer | null
  products:Product[]
  onClose:()=>void
  onSaved:()=>void
}

const OfferModal = ({offer,products,onClose,onSaved}:Props) => {

  const [price,setPrice] = useState(0)
  const [validFrom,setValidFrom] = useState("")
  const [validTo,setValidTo] = useState("")
  const [product,setProduct] = useState<Product | null>(null)

  useEffect(()=>{

    if(offer){
      setPrice(offer.price)
      setValidFrom(offer.validFrom)
      setValidTo(offer.validTo)
      setProduct(offer.product)
    }

  },[offer])

  const handleSave = async ()=>{

    const payload = {
      product:{id:product?.id},
      price,
      validFrom,
      validTo
    }

    if(offer)
      await ApiClient.put(`/offers/${offer.id}`,payload)
    else
      await ApiClient.post("/offers",payload)

    onSaved()
    onClose()
  }

  const options = products.map(p=>({
    value:p.id,
    label:p.name
  }))

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="bg-white p-6 w-96 rounded shadow">

        <h3 className="text-xl mb-4">
          {offer ? "Ajánlat módosítása" : "Új ajánlat"}
        </h3>

        <div className="mb-3">

          <label>Termék</label>

          <Select
            options={options}
            value={product ? {value:product.id,label:product.name} : null}
            onChange={(v:any)=>setProduct(products.find(p=>p.id===v.value)!)}
          />

        </div>

        <div className="mb-3">

          <label>Ár</label>

          <input
            type="number"
            value={price}
            onChange={e=>setPrice(Number(e.target.value))}
            className="border p-2 w-full"
          />

        </div>

        <div className="mb-3">

          <label>Mettől</label>

          <input
            type="date"
            value={validFrom}
            onChange={e=>setValidFrom(e.target.value)}
            className="border p-2 w-full"
          />

        </div>

        <div className="mb-3">

          <label>Meddig</label>

          <input
            type="date"
            value={validTo}
            onChange={e=>setValidTo(e.target.value)}
            className="border p-2 w-full"
          />

        </div>

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Mégse
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Mentés
          </button>

        </div>

      </div>

    </div>
  )
}

export default OfferModal