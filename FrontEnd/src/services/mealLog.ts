import { http } from "@/services/http";
import type { AddMealLogItemRequest, DailyLogResponse } from "@/types/api";

export async function getTodayMealLog(): Promise<DailyLogResponse> {
  const { data } = await http.get<DailyLogResponse>("/api/meal-log/today");
  return data;
}

export async function addMealLogItem(payload: AddMealLogItemRequest): Promise<DailyLogResponse> {
  const { data } = await http.post<DailyLogResponse>("/api/meal-log/items", payload);
  return data;
}
