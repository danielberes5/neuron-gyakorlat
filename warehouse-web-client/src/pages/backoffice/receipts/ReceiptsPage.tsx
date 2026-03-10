import React, { useEffect, useState } from "react";
import ApiClient from "../../../api/ApiClient";
import type { Receipt, Product } from "./types";
import ReceiptTable from "./ReceiptTable";
import ReceiptModal from "./ReceiptModal";

const ReceiptsPage: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null);

  const fetchReceipts = async () => setReceipts((await ApiClient.get("/receipts")).data);
  const fetchProducts = async () => setProducts((await ApiClient.get("/products")).data);

  useEffect(() => {
    fetchReceipts();
    fetchProducts();
  }, []);

  const openModal = (receipt?: Receipt) => {
    setEditingReceipt(receipt || null);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bevételezések</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Hozzáadás
      </button>

      <ReceiptTable receipts={receipts} onEdit={openModal} />

      {modalOpen && (
        <ReceiptModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          receipt={editingReceipt}
          products={products}
          onSaved={fetchReceipts}
        />
      )}
    </div>
  );
};

export default ReceiptsPage;