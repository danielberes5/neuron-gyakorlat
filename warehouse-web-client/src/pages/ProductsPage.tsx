import React, { useEffect, useState } from "react";
import type { IProduct } from "../interfaces/IProduct";
import { getProducts, addProduct } from "../services/ProductService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const loadProducts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProducts(page);

      setProducts(response.items || []); // backend items tömbje
      setTotalPages(Math.ceil(response.total / response.pageSize));
      setCurrentPage(response.page);
    } catch (err) {
      setError("Hiba történt a termékek lekérése során!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(1);
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      loadProducts(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      loadProducts(currentPage - 1);
    }
  };

  const handleAddProduct = async (product: IProduct) => {
    try {
      await addProduct(product);
      setShowForm(false);
      loadProducts(currentPage); // újratöltés a jelenlegi oldalon
    } catch (err) {
      console.error("Hiba a termék hozzáadásakor:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Termékek</h2>

      {loading && <Loading />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && (!products || products.length === 0) && (
        <p>Nincs megjeleníthető termék.</p>
      )}

      {!loading && products && products.length > 0 && (
        <>
          <ProductList products={products} />

          <div className="flex items-center gap-2 mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={handlePrev}
            >
              Előző
            </button>

            <span className="font-semibold">
              {currentPage} / {totalPages}
            </span>

            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
              disabled={currentPage >= totalPages}
              onClick={handleNext}
            >
              Következő
            </button>
          </div>
        </>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition mt-4"
      >
        Hozzáadás
      </button>

      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
