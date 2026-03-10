import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const ApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (token hozzáadása)
ApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
ApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    let userMessage = "Hiba történt, próbáld újra.";

    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;

      if (data?.message) {
        userMessage = data.message;
      }

      const correlationId = data?.correlationId || "nincs";

      console.error("API Error:", {
        url: error.config?.url,
        method: error.config?.method,
        status,
        correlationId,
        data,
      });

      // 401 → logout
      if (status === 401) {
        localStorage.removeItem("accessToken");

        // SPA redirect fallback
        window.location.href = "/login";

        return Promise.reject("Lejárt a munkamenet.");
      }

      // Server error log
      if (status >= 500) {
        try {
          await axios.post(`${BASE_URL}/logs/client`, {
            level: "ERROR",
            message: data?.message || error.message,
            correlationId,
            url: error.config?.url,
            method: error.config?.method,
          });
        } catch (logError) {
          console.error("Client log küldése sikertelen:", logError);
        }
      }

    } else if (error.request) {
      console.error("API Error: no response", error.request);
      userMessage = "A szerver nem válaszol.";
    } else {
      console.error("API Error: request setup", error.message);
      userMessage = error.message;
    }

    return Promise.reject(userMessage);
  }
);

export default ApiClient;