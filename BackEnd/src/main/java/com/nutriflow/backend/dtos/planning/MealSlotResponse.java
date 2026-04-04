package com.nutriflow.backend.dtos.planning;

import com.nutriflow.backend.entities.MealSlot;

import java.util.UUID;

public record MealSlotResponse(
        UUID id,
        Integer dayOfWeek,
        MealSlot.MealType mealType,
        MealSlot.LocationType locationType,
        String note,
        UUID recipeId,
        String recipeTitle,
        String recipeImageUrl
) {
}
