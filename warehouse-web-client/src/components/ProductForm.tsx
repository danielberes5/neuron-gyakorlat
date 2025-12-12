import React, { useState } from "react";
import type { IProduct } from "../interfaces/IProduct";

interface ProductFormProps {
  onSubmit: (product: IProduct) => Promise<void>;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onClose }) => {
  const initialState: IProduct = {
    name: "",
    category: { id: 1, name: "Élelmiszer" }, // default
    quantityUnit: "",
    unit: { id: 1, name: "db" }, // default
    purchasePrice: 0,
    sellingPrice: 0,
    description: "",
  };

  const [formData, setFormData] = useState<IProduct>(initialState);
  const [errors, setErrors] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "purchasePrice" || name === "sellingPrice"
          ? Number(value)
          : value,
    });
  };

  const validate = () => {
    if (!formData.name) return "A név megadása kötelező!";
    if (!formData.quantityUnit) return "A mennyiségi egység megadása kötelező!";
    if (!formData.purchasePrice || formData.purchasePrice <= 0)
      return "A beszerzési ár nagyobb legyen 0-nál!";
    if (!formData.sellingPrice || formData.sellingPrice <= 0)
      return "Az eladási ár nagyobb legyen 0-nál!";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrors(error);
      return;
    }

    await onSubmit(formData);
    setFormData(initialState);
    setErrors("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          color: "black",
          padding: "25px",
          borderRadius: "12px",
          width: "480px",
          maxWidth: "100%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>
          Új termék hozzáadása
        </h3>

        {errors && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errors}</p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {/* Név */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label>Név:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Kategória */}
          <div>
            <label>Kategória:</label>
            <select
              value={formData.category.id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: {
                    id: Number(e.target.value),
                    name: e.target.options[e.target.selectedIndex].text,
                  },
                })
              }
            >
              <option value={1}>Élelmiszer</option>
              <option value={2}>Elektronika</option>
              <option value={3}>Irodaszer</option>
              <option value={4}>Tisztítószer</option>
            </select>
          </div>

          {/* Mennyiségi egység */}
          <div>
            <label>Mennyiségi egység:</label>
            <input
              name="quantityUnit"
              value={formData.quantityUnit}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Mértékegység */}
          <div>
            <label>Mértékegység:</label>
            <select
              value={formData.unit.id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unit: {
                    id: Number(e.target.value),
                    name: e.target.options[e.target.selectedIndex].text,
                  },
                })
              }
            >
              <option value={1}>db</option>
              <option value={2}>kg</option>
              <option value={3}>csomag</option>
              <option value={4}>liter</option>
            </select>
          </div>

          {/* Beszerzési ár */}
          <div>
            <label>Beszerzési ár:</label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              min={1}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Eladási ár */}
          <div>
            <label>Eladási ár:</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              min={1}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Leírás */}
          <div style={{ gridColumn: "1 / 3" }}>
            <label>Leírás:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "70px" }}
            />
          </div>

          {/* Gombok */}
          <div style={{ gridColumn: "1 / 3", marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <button type="button" onClick={onClose} style={{ background: "#ccc", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", border: "none" }}>
              Mégse
            </button>
            <button type="submit" style={{ background: "#4a90e2", color: "white", padding: "8px 15px", borderRadius: "6px", cursor: "pointer", border: "none" }}>
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
