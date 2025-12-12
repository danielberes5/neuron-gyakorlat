import React from "react";
import type { IProduct } from "../interfaces/IProduct";

interface Props {
  products: IProduct[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="p-3 text-left">Név</th>
          <th className="p-3 text-left">Kategória</th>
          <th className="p-3 text-left">Mennyiségi egység</th>
          <th className="p-3 text-left">Mértékegység</th>
          <th className="p-3 text-left">Beszerzési ár</th>
          <th className="p-3 text-left">Eladási ár</th>
          <th className="p-3 text-left">Leírás</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b hover:bg-gray-100">
            <td className="p-3">{p.name}</td>
            <td className="p-3">{p.category?.name}</td>
            <td className="p-3">{p.quantityUnit}</td>
            <td className="p-3">{p.unit?.name}</td>
            <td className="p-3">{p.purchasePrice} Ft</td>
            <td className="p-3">{p.sellingPrice} Ft</td>
            <td className="p-3">{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
