import { http } from "@/services/http";
import type { MeResponse, UpdateProfileRequest } from "@/types/api";

export async function getMe(): Promise<MeResponse> {
  const { data } = await http.get<MeResponse>("/api/me");
  return data;
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<MeResponse> {
  const { data } = await http.patch<MeResponse>("/api/me", payload);
  return data;
}
