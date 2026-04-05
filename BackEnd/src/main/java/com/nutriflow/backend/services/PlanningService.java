package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.planning.AddSlotRequest;
import com.nutriflow.backend.dtos.planning.CurrentWeekPlanResponse;
import com.nutriflow.backend.dtos.planning.MealSlotResponse;
import com.nutriflow.backend.dtos.planning.UpdateSlotRequest;
import com.nutriflow.backend.entities.MealSlot;
import com.nutriflow.backend.entities.WeeklyPlan;
import com.nutriflow.backend.repositories.MealSlotRepository;
import com.nutriflow.backend.repositories.RecipeRepository;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlanningService {

    private final AuthenticatedUserService authenticatedUserService;
    private final WeeklyPlanRepository weeklyPlanRepository;
    private final MealSlotRepository mealSlotRepository;
    private final RecipeRepository recipeRepository;

    @Transactional(readOnly = true)
    public CurrentWeekPlanResponse getCurrentWeekPlan() {
        LocalDate monday = LocalDate.now().with(WeekFields.of(Locale.FRANCE).dayOfWeek(), 1);
        return getWeekPlan(monday);
    }

    @Transactional
    public CurrentWeekPlanResponse getWeekPlan(LocalDate weekStart) {
        var user = authenticatedUserService.requireCurrentUser();
        LocalDate monday = normalizeMonday(weekStart);

        var plan = weeklyPlanRepository.findByUserIdAndWeekStartDate(user.getId(), monday)
                .orElseGet(() -> weeklyPlanRepository.save(
                        WeeklyPlan.builder()
                                .user(user)
                                .weekStartDate(monday)
                                .status(WeeklyPlan.Status.DRAFT)
                                .build()
                ));

        return toCurrentWeekPlanResponse(plan);
    }

    @Transactional
    public CurrentWeekPlanResponse addSlot(AddSlotRequest request) {
        var user = authenticatedUserService.requireCurrentUser();
        LocalDate monday = normalizeMonday(request.weekStart() != null ? request.weekStart() : LocalDate.now());

        var plan = weeklyPlanRepository.findByUserIdAndWeekStartDate(user.getId(), monday)
                .orElseGet(() -> weeklyPlanRepository.save(
                        WeeklyPlan.builder()
                                .user(user)
                                .weekStartDate(monday)
                                .status(WeeklyPlan.Status.DRAFT)
                                .build()
                ));

        var recipe = request.recipeId() != null
                ? recipeRepository.findById(request.recipeId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recette introuvable."))
                : null;

        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan)
                .dayOfWeek(validateDay(request.dayOfWeek()))
                .mealType(request.mealType() != null ? request.mealType() : MealSlot.MealType.LUNCH)
                .locationType(request.locationType() != null ? request.locationType() : MealSlot.LocationType.HOME)
                .recipe(recipe)
                .note(request.note())
                .build());

        return toCurrentWeekPlanResponse(plan);
    }

    @Transactional
    public CurrentWeekPlanResponse updateSlot(UUID slotId, UpdateSlotRequest request) {
        var user = authenticatedUserService.requireCurrentUser();
        var slot = requireOwnedSlot(slotId, user.getId());

        if (request.dayOfWeek() != null) slot.setDayOfWeek(validateDay(request.dayOfWeek()));
        if (request.mealType() != null) slot.setMealType(request.mealType());
        if (request.locationType() != null) slot.setLocationType(request.locationType());
        if (request.note() != null) slot.setNote(request.note());
        if (request.recipeId() != null) {
            var recipe = recipeRepository.findById(request.recipeId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recette introuvable."));
            slot.setRecipe(recipe);
        }

        mealSlotRepository.save(slot);
        return toCurrentWeekPlanResponse(slot.getWeeklyPlan());
    }

    @Transactional
    public CurrentWeekPlanResponse deleteSlot(UUID slotId) {
        var user = authenticatedUserService.requireCurrentUser();
        var slot = requireOwnedSlot(slotId, user.getId());
        var plan = slot.getWeeklyPlan();
        mealSlotRepository.delete(slot);
        return toCurrentWeekPlanResponse(plan);
    }

    private CurrentWeekPlanResponse toCurrentWeekPlanResponse(WeeklyPlan plan) {
        var slots = mealSlotRepository.findAllByWeeklyPlanIdOrderByDayOfWeekAsc(plan.getId())
                .stream()
                .map(this::toMealSlotResponse)
                .toList();

        return new CurrentWeekPlanResponse(plan.getId(), plan.getWeekStartDate(), plan.getStatus(), slots);
    }

    private MealSlotResponse toMealSlotResponse(MealSlot slot) {
        return new MealSlotResponse(
                slot.getId(),
                slot.getDayOfWeek(),
                slot.getMealType(),
                slot.getLocationType(),
                slot.getNote(),
                slot.getRecipe() != null ? slot.getRecipe().getId() : null,
                slot.getRecipe() != null ? slot.getRecipe().getTitle() : null,
                slot.getRecipe() != null ? slot.getRecipe().getImageUrl() : null
        );
    }

    private MealSlot requireOwnedSlot(UUID slotId, UUID userId) {
        var slot = mealSlotRepository.findById(slotId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Créneau introuvable."));
        if (!slot.getWeeklyPlan().getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Ce créneau ne vous appartient pas.");
        }
        return slot;
    }

    private int validateDay(Integer day) {
        if (day == null || day < 1 || day > 7) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "dayOfWeek doit être entre 1 et 7.");
        }
        return day;
    }

    private LocalDate normalizeMonday(LocalDate date) {
        LocalDate target = date != null ? date : LocalDate.now();
        return target.with(WeekFields.of(Locale.FRANCE).dayOfWeek(), 1);
    }
}
