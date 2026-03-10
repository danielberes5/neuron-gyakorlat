// src/api/auth.ts
import ApiClient from "./ApiClient";

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
}

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}


export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  const response = await ApiClient.post<ILoginResponse>("/auth/login", data);
  return response.data;
};

export const register = async (data: IRegisterRequest): Promise<void> => {
  await ApiClient.post("/auth/register", data);
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};