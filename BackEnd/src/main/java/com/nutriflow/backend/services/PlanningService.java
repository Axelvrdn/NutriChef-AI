package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.planning.CurrentWeekPlanResponse;
import com.nutriflow.backend.dtos.planning.MealSlotResponse;
import com.nutriflow.backend.repositories.MealSlotRepository;
import com.nutriflow.backend.repositories.WeeklyPlanRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PlanningService {

    private final AuthenticatedUserService authenticatedUserService;
    private final WeeklyPlanRepository weeklyPlanRepository;
    private final MealSlotRepository mealSlotRepository;

    @Transactional(readOnly = true)
    public CurrentWeekPlanResponse getCurrentWeekPlan() {
        var user = authenticatedUserService.requireCurrentUser();
        LocalDate monday = LocalDate.now().with(WeekFields.of(Locale.FRANCE).dayOfWeek(), 1);

        var plan = weeklyPlanRepository.findByUserIdAndWeekStartDate(user.getId(), monday)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun planning pour cette semaine."));

        var slots = mealSlotRepository.findAllByWeeklyPlanIdOrderByDayOfWeekAsc(plan.getId())
                .stream()
                .map(slot -> new MealSlotResponse(
                        slot.getId(),
                        slot.getDayOfWeek(),
                        slot.getMealType(),
                        slot.getLocationType(),
                        slot.getNote(),
                        slot.getRecipe() != null ? slot.getRecipe().getId() : null,
                        slot.getRecipe() != null ? slot.getRecipe().getTitle() : null,
                        slot.getRecipe() != null ? slot.getRecipe().getImageUrl() : null
                ))
                .toList();

        return new CurrentWeekPlanResponse(
                plan.getId(),
                plan.getWeekStartDate(),
                plan.getStatus(),
                slots
        );
    }
}
