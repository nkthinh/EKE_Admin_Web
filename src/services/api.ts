import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config";

export const AUTH_TOKEN_KEY = "auth_token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Avoid ngrok browser warning HTML responses
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>) => {
    // Optional: handle 401 globally
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

// Auth service
export const AuthService = {
  async login(payload: { email: string; password: string }) {
    const { data } = await api.post(`/Auth/login`, payload);
    // Try to resolve token from common response shapes
    const token =
      // Preferred: data.accessToken (per API response)
      (data as any)?.data?.accessToken ??
      (typeof data === "string" ? (data as string) : undefined);
    if (!token) {
      throw new Error("Không lấy được token từ phản hồi đăng nhập");
    }
    localStorage.setItem(AUTH_TOKEN_KEY, token as string);
    return data as any;
  },
  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};

// Users service (CRUD skeleton)
export const UsersService = {
  // Backend returns: { success: true, data: User[] }
  getAll: async (): Promise<any[]> =>
    (await api.get(`/Users`)).data?.data ?? [],
  getById: async (id: string) => (await api.get(`/users/${id}`)).data,
  create: async (payload: any) => (await api.post(`/users`, payload)).data,
  update: async (id: string, payload: any) =>
    (await api.put(`/users/${id}`, payload)).data,
  remove: async (id: string) => (await api.delete(`/users/${id}`)).data,
};

// Transactions
export const TransactionsService = {
  getAll: async (params?: any) =>
    (await api.get(`/transactions`, { params })).data,
};

// Top up
export const WalletService = {
  // Get wallet by user id
  getByUserId: async (userId: number): Promise<any> =>
    (await api.get(`/Wallet/${userId}`)).data?.data ??
    (await api.get(`/Wallet/${userId}`)).data,
  // Set absolute balance using PATCH /Wallet/{userId}/balance { newBalance }
  setBalance: async (userId: number, newBalance: number) =>
    (await api.patch(`/Wallet/${userId}/balance`, { newBalance })).data,
  // Helper to add amount: read current balance then PUT new total
  addBalance: async (userId: number, amount: number) => {
    const wallet = await (async () => {
      try {
        return await WalletService.getByUserId(userId);
      } catch {
        return undefined;
      }
    })();
    const current = typeof wallet?.balance === "number" ? wallet.balance : 0;
    const next = current + amount;
    return WalletService.setBalance(userId, next);
  },
};

// Packages
export const PackagesService = {
  // Map to backend subscriptions endpoint
  getAll: async (): Promise<any[]> =>
    (await api.get(`/subscriptions`)).data?.data ?? [],
  create: async (payload: any) =>
    (await api.post(`/subscriptions`, payload)).data,
  update: async (id: string, payload: any) =>
    (await api.put(`/subscriptions/${id}`, payload)).data,
  remove: async (id: string) => (await api.delete(`/subscriptions/${id}`)).data,
};
