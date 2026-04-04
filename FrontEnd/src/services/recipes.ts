import { http } from "@/services/http";
import type { CreateRecipeRequest, RecipeResponse } from "@/types/api";

export async function getRecipes(): Promise<RecipeResponse[]> {
  const { data } = await http.get<RecipeResponse[]>("/api/recipes");
  return data;
}

export async function createRecipe(payload: CreateRecipeRequest): Promise<RecipeResponse> {
  const { data } = await http.post<RecipeResponse>("/api/recipes", payload);
  return data;
}
