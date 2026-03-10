import { useState } from "react"
import type { Offer } from "./types"

interface Props{
  offers:Offer[]
  onChange:(name:string,category:string,sort:string)=>void
}

const OfferFilters = ({offers,onChange}:Props) => {

  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [sort,setSort] = useState("")

  const categories = [
    ...new Set(
      offers.map(o=>o.product.category.name)
    )
  ]

  const apply = () =>{
    onChange(name,category,sort)
  }

  return (
    <div className="flex gap-3">

      <input
        placeholder="Termék neve"
        value={name}
        onChange={e=>setName(e.target.value)}
        className="border p-2"
      />

      <select
        value={category}
        onChange={e=>setCategory(e.target.value)}
        className="border p-2"
      >
        <option value="">Összes kategória</option>

        {categories.map(c=>(
          <option key={c}>{c}</option>
        ))}

      </select>

      <select
        value={sort}
        onChange={e=>setSort(e.target.value)}
        className="border p-2"
      >
        <option value="">Rendezés</option>
        <option value="price">Ár szerint</option>
        <option value="name">Név szerint</option>
      </select>

      <button
        onClick={apply}
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        Szűrés
      </button>

    </div>
  )
}

export default OfferFilters