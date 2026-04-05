package com.nutriflow.backend.dtos.meallog;

import com.nutriflow.backend.entities.MealLogItem;

import java.time.LocalDateTime;
import java.util.UUID;

public record MealLogItemResponse(
        UUID id,
        MealLogItem.MealType mealType,
        MealLogItem.SourceType sourceType,
        String label,
        Double quantity,
        String unit,
        Double kcal,
        Double proteinG,
        Double carbG,
        Double fatG,
        LocalDateTime consumedAt
) {
}
