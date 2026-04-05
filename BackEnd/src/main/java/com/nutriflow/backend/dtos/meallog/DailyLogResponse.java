package com.nutriflow.backend.dtos.meallog;

import java.time.LocalDate;
import java.util.List;

public record DailyLogResponse(
        LocalDate logDate,
        Double totalKcal,
        Double totalProteinG,
        Double totalCarbG,
        Double totalFatG,
        List<MealLogItemResponse> items
) {
}
