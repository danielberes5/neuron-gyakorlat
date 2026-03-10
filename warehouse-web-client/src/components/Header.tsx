import { useContext } from "react";
import { AuthContext } from "../api/AuthContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Warehouse Web Client</h1>

      <nav className="flex gap-4 items-center">

        {/* webshop */}
        <Link to="/webshop/offers">Offers</Link>
        <Link to="/webshop/cart">Cart</Link>

        {/* régi oldal */}
        <Link to="/products">Products</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {/* backoffice */}
            <Link to="/backoffice/receipts">Receipts</Link>
            <Link to="/backoffice/offers">BO Offers</Link>
            <Link to="/backoffice/orders">Orders</Link>

            <span>Hello, {user.email || "User"}</span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;