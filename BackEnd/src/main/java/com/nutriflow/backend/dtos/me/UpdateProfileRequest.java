package com.nutriflow.backend.dtos.me;

import com.nutriflow.backend.entities.UserProfile;

import java.time.LocalDate;

public record UpdateProfileRequest(
        String displayName,
        String subtitle,
        String bio,
        UserProfile.Gender gender,
        LocalDate birthDate,
        Double heightCm,
        UserProfile.ActivityLevel activityLevel,
        UserProfile.Goal goal,
        UserProfile.CookingLevel cookingLevel,
        String dietPreferences,
        String intolerances,
        Integer kcalGoal,
        Integer hydrationGoalMl
) {
}
