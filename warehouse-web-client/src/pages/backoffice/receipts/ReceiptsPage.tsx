import React, { useEffect, useState } from "react";
import { getReceipts, createReceipt, updateReceipt, Receipt } from "../../api/receipts";
import ReceiptModal from "../../../components/modals/ReceiptModal";

const ReceiptsPage: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | undefined>();

  // lapozás
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(receipts.length / itemsPerPage);

  const fetchReceipts = async () => {
    const data = await getReceipts();
    setReceipts(data);
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleAdd = () => {
    setSelectedReceipt(undefined);
    setModalOpen(true);
  };

  const handleEdit = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setModalOpen(true);
  };

  const handleSave = async (data: Partial<Receipt>) => {
    if (selectedReceipt) {
      await updateReceipt(selectedReceipt.id, data);
    } else {
      await createReceipt(data);
    }
    setModalOpen(false);
    fetchReceipts();
  };

  // Lapozott lista
  const displayedReceipts = receipts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Bevételezések</h1>
        <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-1 rounded">
          Hozzáadás
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sorszám</th>
            <th className="border p-2">Időpont</th>
            <th className="border p-2">Tételek száma</th>
            <th className="border p-2">Művelet</th>
          </tr>
        </thead>
        <tbody>
          {displayedReceipts.map((r) => (
            <tr key={r.id} className="hover:bg-gray-100">
              <td className="border p-2">{r.receiptNumber}</td>
              <td className="border p-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="border p-2">{r.items.length}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(r)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Módosítás
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lapozás */}
      <div className="flex justify-center mt-4 gap-2">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">
          Előző
        </button>
        <span className="px-3 py-1">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 border rounded"
        >
          Következő
        </button>
      </div>

      <ReceiptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        receipt={selectedReceipt}
      />
    </div>
  );
};

export default ReceiptsPage;