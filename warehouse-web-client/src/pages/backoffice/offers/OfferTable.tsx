import type { Offer } from "./types"

interface Props{
  offers: Offer[]
  onEdit:(offer:Offer)=>void
}

const OfferTable = ({offers,onEdit}:Props) => {

  return (
    <table className="w-full border">

      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Termék</th>
          <th className="p-2 border">Ár</th>
          <th className="p-2 border">Érvényesség</th>
          <th className="p-2 border">Művelet</th>
        </tr>
      </thead>

      <tbody>

        {offers.map(o=>(
          <tr key={o.id}>

            <td className="border p-2">
              {o.product.name}
            </td>

            <td className="border p-2">
              {o.price}
            </td>

            <td className="border p-2">
              {o.validFrom} - {o.validTo}
            </td>

            <td className="border p-2">

              <button
                onClick={()=>onEdit(o)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Módosítás
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  )
}

export default OfferTable