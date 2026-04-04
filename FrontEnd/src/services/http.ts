import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { clearAuthTokens, getAccessToken, getRefreshToken, storeAuthTokens } from "@/services/tokenStorage";
import type { AuthResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

interface RetriableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest | undefined;
    if (!originalRequest || originalRequest._retry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAuthTokens();
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/refresh`, { refreshToken });
      const refreshed = data;
      storeAuthTokens(refreshed.accessToken, refreshed.refreshToken, refreshed.expiresIn);
      originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      return Promise.reject(refreshError);
    }
  }
);
