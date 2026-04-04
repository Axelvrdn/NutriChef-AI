package com.nutriflow.backend.dtos.recipes;

import java.time.LocalDateTime;
import java.util.UUID;

public record RecipeResponse(
        UUID id,
        String title,
        String description,
        String imageUrl,
        String category,
        String seasonTags,
        Integer servings,
        Integer prepMinutes,
        Integer cookMinutes,
        Integer totalMinutes,
        Double kcalPerServing,
        Double proteinG,
        Double carbG,
        Double fatG,
        Boolean isPublic,
        UUID authorUserId,
        String authorUsername,
        LocalDateTime createdAt
) {
}
