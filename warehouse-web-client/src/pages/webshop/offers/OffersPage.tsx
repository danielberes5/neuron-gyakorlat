import { useEffect, useState } from "react"
import ApiClient from "../../../api/ApiClient"
import type { Offer } from "./types"
import OfferCard from "./OfferCard"
import OfferFilters from "./OfferFilters"

const OffersPage = () => {

  const [offers,setOffers] = useState<Offer[]>([])
  const [filtered,setFiltered] = useState<Offer[]>([])

  const loadOffers = async () => {
    const res = await ApiClient.get("/offers/active")
    setOffers(res.data)
    setFiltered(res.data)
  }

  useEffect(()=>{
    loadOffers()
  },[])

  const handleFilter = (
    name:string,
    category:string,
    sort:string
  ) => {

    let data = [...offers]

    if(name){
      data = data.filter(o =>
        o.product.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if(category){
      data = data.filter(o =>
        o.product.category.name === category
      )
    }

    if(sort === "price"){
      data.sort((a,b)=>a.price-b.price)
    }

    if(sort === "name"){
      data.sort((a,b)=>
        a.product.name.localeCompare(b.product.name)
      )
    }

    setFiltered(data)
  }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Ajánlatok
      </h2>

      <OfferFilters
        offers={offers}
        onChange={handleFilter}
      />

      <div className="grid grid-cols-4 gap-4 mt-4">

        {filtered.map(o=>(
          <OfferCard
            key={o.id}
            offer={o}
          />
        ))}

      </div>

    </div>
  )
}

export default OffersPage