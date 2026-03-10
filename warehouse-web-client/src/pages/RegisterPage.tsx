// src/pages/RegisterPage.tsx
import { useState, useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Sikeres regisztráció! Jelentkezz be.");
      navigate("/login");
    } catch (err) {
      alert("Hiba a regisztráció során");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;