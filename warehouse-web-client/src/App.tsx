import React, { useContext, type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./api/AuthContext";

import Header from "./components/Header";

import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

/* webshop */
import OffersPage from "./pages/webshop/offers/OffersPage";
import CartPage from "./pages/webshop/cart/CartPage";
import OrderPage from "./pages/webshop/order/OrderPage";

/* backoffice */
import ReceiptsPage from "./pages/backoffice/receipts/ReceiptsPage";
import BackofficeOffersPage from "./pages/backoffice/offers/OffersPage";
import OrdersPage from "./pages/backoffice/orders/OrdersPage";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />

      <Routes>

        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* webshop */}
        <Route path="/webshop/offers" element={<OffersPage />} />
        <Route path="/webshop/cart" element={<CartPage />} />
        <Route path="/webshop/order" element={<OrderPage />} />

        {/* régi oldal */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        {/* backoffice */}
        <Route
          path="/backoffice/receipts"
          element={
            <ProtectedRoute>
              <ReceiptsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/backoffice/offers"
          element={
            <ProtectedRoute>
              <BackofficeOffersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/backoffice/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* default */}
        <Route path="/" element={<Navigate to="/webshop/offers" replace />} />

        <Route path="*" element={<Navigate to="/webshop/offers" replace />} />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;