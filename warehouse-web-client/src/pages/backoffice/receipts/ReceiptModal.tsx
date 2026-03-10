import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import type { Receipt, Product, ReceiptItem } from "./types";
import ApiClient from "../../../api/ApiClient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
  products: Product[];
  onSaved: () => void;
}

const ReceiptModal: React.FC<Props> = ({ isOpen, onClose, receipt, products, onSaved }) => {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [originalItems, setOriginalItems] = useState<ReceiptItem[]>([]);

  useEffect(() => {
    if (receipt) {
      setItems(receipt.items.map(i => ({ ...i })));
      setOriginalItems(receipt.items.map(i => ({ ...i })));
    } else {
      setItems([]);
      setOriginalItems([]);
    }
  }, [receipt]);

  const isChanged = () => JSON.stringify(items) !== JSON.stringify(originalItems);

  const handleSave = async () => {
    if (receipt) {
      await ApiClient.put(`/receipts/${receipt.id}`, { ...receipt, items });
    } else {
      await ApiClient.post("/receipts", { receiptNumber: `R-${Date.now()}`, items });
    }
    onSaved();
    onClose();
  };

  const handleItemChange = (index: number, field: keyof ReceiptItem, value: any) => {
    const newItems = [...items];
    if (field === "quantity") newItems[index][field] = Number(value);
    else newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => setItems([...items, { product: products[0], quantity: 1 }]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white p-6 rounded shadow w-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">
            {receipt ? "Bevételezés módosítása" : "Új bevételezés"}
          </Dialog.Title>

          {items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <select
                value={item.product.id}
                onChange={e =>
                  handleItemChange(index, "product", products.find(p => p.id === Number(e.target.value)))
                }
                className="border p-1 flex-1"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={e => handleItemChange(index, "quantity", e.target.value)}
                className="border p-1 w-24"
              />
            </div>
          ))}

          <button className="bg-green-500 text-white px-2 py-1 rounded mb-4" onClick={handleAddItem}>
            Tétel hozzáadása
          </button>

          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={onClose}>
              Mégse
            </button>
            <button
              className={`px-3 py-1 rounded text-white ${
                isChanged() ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isChanged()}
              onClick={handleSave}
            >
              Mentés
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReceiptModal;