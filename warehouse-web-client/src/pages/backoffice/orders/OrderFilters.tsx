interface Props{
  onFilter:(status:string,from:string,to:string)=>void
}

const OrderFilters = ({onFilter}:Props) => {

  let status = ""
  let from = ""
  let to = ""

  return (

    <div className="flex gap-3 mb-4">

      <select
        onChange={e => {
          status = e.target.value
        }}
        className="border p-2"
      >
        <option value="">Összes státusz</option>
        <option value="NEW">Új</option>
        <option value="CONFIRMED">Megerősített</option>
        <option value="INVALID">Invalid</option>
        <option value="SHIPPING">Szállítás alatt</option>
        <option value="COMPLETED">Teljesített</option>
      </select>

      <input
        type="date"
        onChange={e => {
          from = e.target.value
        }}
        className="border p-2"
      />

      <input
        type="date"
        onChange={e => {
          to = e.target.value
        }}
        className="border p-2"
      />

      <button
        onClick={()=>onFilter(status,from,to)}
        className="bg-blue-600 text-white px-3"
      >
        Szűrés
      </button>

    </div>

  )

}

export default OrderFilters