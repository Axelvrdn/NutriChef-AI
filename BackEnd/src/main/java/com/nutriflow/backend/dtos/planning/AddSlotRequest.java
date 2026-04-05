package com.nutriflow.backend.dtos.planning;

import com.nutriflow.backend.entities.MealSlot;

import java.time.LocalDate;
import java.util.UUID;

public record AddSlotRequest(
        LocalDate weekStart,
        Integer dayOfWeek,
        MealSlot.MealType mealType,
        MealSlot.LocationType locationType,
        UUID recipeId,
        String note
) {
}
