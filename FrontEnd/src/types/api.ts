export type UserRole = "USER" | "ADMIN" | "NUTRITIONIST";
export type UserStatus = "ACTIVE" | "PENDING" | "DISABLED";

export interface AuthUserResponse {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
}

export interface AuthResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUserResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  displayName?: string;
}

export type Gender = "HOMME" | "FEMME" | "AUTRE";
export type ActivityLevel = "SEDENTAIRE" | "ACTIF" | "TRES_ACTIF";
export type Goal = "PERTE" | "GAIN" | "MAINTIEN";
export type CookingLevel = "DEBUTANT" | "INITIE" | "INTERMEDIAIRE" | "AVANCE";

export interface UpdateProfileRequest {
  displayName?: string;
  subtitle?: string;
  bio?: string;
  gender?: Gender;
  birthDate?: string;
  heightCm?: number;
  activityLevel?: ActivityLevel;
  goal?: Goal;
  cookingLevel?: CookingLevel;
  dietPreferences?: string;
  intolerances?: string;
  kcalGoal?: number;
  hydrationGoalMl?: number;
}

export interface MeResponse {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  displayName: string | null;
  subtitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
  kcalGoal: number | null;
  hydrationGoalMl: number | null;
  dietPreferences: string | null;
  intolerances: string | null;
  allergies: string | null;
}

export interface RecipeResponse {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string | null;
  seasonTags: string | null;
  servings: number;
  prepMinutes: number | null;
  cookMinutes: number | null;
  totalMinutes: number | null;
  kcalPerServing: number | null;
  proteinG: number | null;
  carbG: number | null;
  fatG: number | null;
  isPublic: boolean | null;
  authorUserId: string;
  authorUsername: string;
  createdAt: string;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  seasonTags?: string;
  servings: number;
  prepMinutes?: number;
  cookMinutes?: number;
  totalMinutes?: number;
  kcalPerServing?: number;
  proteinG?: number;
  carbG?: number;
  fatG?: number;
  isPublic?: boolean;
}

export interface MealSlotResponse {
  id: string;
  dayOfWeek: number;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  locationType: "HOME" | "RESTAURANT" | "OUTSIDE";
  note: string | null;
  recipeId: string | null;
  recipeTitle: string | null;
  recipeImageUrl: string | null;
}

export interface CurrentWeekPlanResponse {
  weeklyPlanId: string;
  weekStartDate: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  slots: MealSlotResponse[];
}

export interface AddSlotRequest {
  weekStart: string;
  dayOfWeek: number;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  locationType: "HOME" | "RESTAURANT" | "OUTSIDE";
  recipeId?: string | null;
  note?: string;
}

export interface UpdateSlotRequest {
  dayOfWeek?: number;
  mealType?: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  locationType?: "HOME" | "RESTAURANT" | "OUTSIDE";
  recipeId?: string | null;
  note?: string;
}

export interface MealLogItemResponse {
  id: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  sourceType: "OFF_PRODUCT" | "MANUAL";
  label: string;
  quantity: number;
  unit: string;
  kcal: number | null;
  proteinG: number | null;
  carbG: number | null;
  fatG: number | null;
  consumedAt: string;
}

export interface DailyLogResponse {
  logDate: string;
  totalKcal: number;
  totalProteinG: number;
  totalCarbG: number;
  totalFatG: number;
  items: MealLogItemResponse[];
}

export interface AddMealLogItemRequest {
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";
  label: string;
  quantity: number;
  unit: string;
  kcal: number;
  proteinG?: number;
  carbG?: number;
  fatG?: number;
}

export interface PostCommentResponse {
  id: string;
  authorUsername: string;
  authorAvatarUrl: string | null;
  content: string;
  createdAt: string;
}

export interface DiscoverFeedItemResponse {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  type: "RECIPE_SHARE" | "TIP" | "EDITORIAL" | "USER_POST";
  isCurated: boolean;
  shareCount: number;
  createdAt: string;
  authorId: string | null;
  authorUsername: string | null;
  authorDisplayName: string | null;
  authorAvatarUrl: string | null;
  recipeId: string | null;
  recipeTitle: string | null;
  likeCount: number;
  commentCount: number;
  likedByCurrentUser: boolean;
}
