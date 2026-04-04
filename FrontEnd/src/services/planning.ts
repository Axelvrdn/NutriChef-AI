import { http } from "@/services/http";
import type { AddSlotRequest, CurrentWeekPlanResponse, UpdateSlotRequest } from "@/types/api";

export async function getCurrentWeekPlan(): Promise<CurrentWeekPlanResponse> {
  const { data } = await http.get<CurrentWeekPlanResponse>("/api/planning/current-week");
  return data;
}

export async function getWeekPlan(weekStart: string): Promise<CurrentWeekPlanResponse> {
  const { data } = await http.get<CurrentWeekPlanResponse>("/api/planning/week", { params: { weekStart } });
  return data;
}

export async function addPlanningSlot(payload: AddSlotRequest): Promise<CurrentWeekPlanResponse> {
  const { data } = await http.post<CurrentWeekPlanResponse>("/api/planning/slots", payload);
  return data;
}

export async function updatePlanningSlot(slotId: string, payload: UpdateSlotRequest): Promise<CurrentWeekPlanResponse> {
  const { data } = await http.patch<CurrentWeekPlanResponse>(`/api/planning/slots/${slotId}`, payload);
  return data;
}

export async function deletePlanningSlot(slotId: string): Promise<CurrentWeekPlanResponse> {
  const { data } = await http.delete<CurrentWeekPlanResponse>(`/api/planning/slots/${slotId}`);
  return data;
}
