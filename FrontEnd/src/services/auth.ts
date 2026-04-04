import { http } from "@/services/http";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/api";

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function refresh(refreshToken: string): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>("/auth/refresh", { refreshToken });
  return data;
}
