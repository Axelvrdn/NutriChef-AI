package com.nutriflow.backend.dtos.planning;

import com.nutriflow.backend.entities.MealSlot;

import java.util.UUID;

public record UpdateSlotRequest(
        Integer dayOfWeek,
        MealSlot.MealType mealType,
        MealSlot.LocationType locationType,
        UUID recipeId,
        String note
) {
}
