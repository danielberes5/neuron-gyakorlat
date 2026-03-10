import React from "react";
import type { Receipt } from "./types";

interface Props {
  receipts: Receipt[];
  onEdit: (receipt: Receipt) => void;
}

const ReceiptTable: React.FC<Props> = ({ receipts, onEdit }) => {
  return (
    <table className="min-w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Sorszám</th>
          <th className="p-2 border">Dátum</th>
          <th className="p-2 border">Tételek</th>
          <th className="p-2 border">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {receipts.map(r => (
          <tr key={r.id}>
            <td className="p-2 border">{r.receiptNumber}</td>
            <td className="p-2 border">{new Date(r.createdAt).toLocaleString()}</td>
            <td className="p-2 border">
              {r.items.map(i => `${i.product.name} (${i.quantity})`).join(", ")}
            </td>
            <td className="p-2 border">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => onEdit(r)}
              >
                Módosítás
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReceiptTable;