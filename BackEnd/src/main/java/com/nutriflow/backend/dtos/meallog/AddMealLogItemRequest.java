package com.nutriflow.backend.dtos.meallog;

import com.nutriflow.backend.entities.MealLogItem;

public record AddMealLogItemRequest(
        MealLogItem.MealType mealType,
        String label,
        Double quantity,
        String unit,
        Double kcal,
        Double proteinG,
        Double carbG,
        Double fatG
) {
}
