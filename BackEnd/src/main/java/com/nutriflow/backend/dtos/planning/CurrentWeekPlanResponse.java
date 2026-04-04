package com.nutriflow.backend.dtos.planning;

import com.nutriflow.backend.entities.WeeklyPlan;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record CurrentWeekPlanResponse(
        UUID weeklyPlanId,
        LocalDate weekStartDate,
        WeeklyPlan.Status status,
        List<MealSlotResponse> slots
) {
}
