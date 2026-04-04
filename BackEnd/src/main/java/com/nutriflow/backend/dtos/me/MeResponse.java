package com.nutriflow.backend.dtos.me;

import com.nutriflow.backend.entities.User;

import java.util.UUID;

public record MeResponse(
        UUID id,
        String email,
        String username,
        User.Role role,
        User.Status status,
        String displayName,
        String subtitle,
        String bio,
        String avatarUrl,
        Integer kcalGoal,
        Integer hydrationGoalMl,
        String dietPreferences,
        String intolerances,
        String allergies
) {
}
