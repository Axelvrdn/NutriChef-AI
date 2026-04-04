package com.nutriflow.backend.dtos.recipes;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateRecipeRequest(
        @NotBlank @Size(max = 255) String title,
        @NotBlank String description,
        String imageUrl,
        String category,
        String seasonTags,
        @NotNull @Min(1) Integer servings,
        @Min(0) Integer prepMinutes,
        @Min(0) Integer cookMinutes,
        @Min(0) Integer totalMinutes,
        Double kcalPerServing,
        Double proteinG,
        Double carbG,
        Double fatG,
        Boolean isPublic
) {
}
