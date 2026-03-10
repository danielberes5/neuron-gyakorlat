import { createContext, useState, useEffect, type ReactNode } from "react";
import ApiClient from "./ApiClient";
import * as AuthApi from "./Auth";

interface AuthContextType {
  user: { email?: string; token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email?: string; token: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser({ token });
  }, []);

  const login = async (email: string, password: string) => {
  const res = await AuthApi.login({ email, password });

  localStorage.setItem("accessToken", res.accessToken);

  setUser({
    email,
    token: res.accessToken
  });
};

  const register = async (name: string, email: string, password: string) => {
    await ApiClient.post("/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};