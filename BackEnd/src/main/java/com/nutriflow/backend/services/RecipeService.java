package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.recipes.CreateRecipeRequest;
import com.nutriflow.backend.dtos.recipes.RecipeResponse;
import com.nutriflow.backend.entities.Recipe;
import com.nutriflow.backend.repositories.RecipeRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final AuthenticatedUserService authenticatedUserService;

    @Transactional(readOnly = true)
    public List<RecipeResponse> getRecipesForCurrentUser() {
        var user = authenticatedUserService.requireCurrentUser();
        return recipeRepository.findByAuthorUserIdOrIsPublicTrueOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public RecipeResponse createRecipe(CreateRecipeRequest request) {
        var user = authenticatedUserService.requireCurrentUser();
        Recipe recipe = recipeRepository.save(Recipe.builder()
                .authorUser(user)
                .title(request.title())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .category(request.category())
                .seasonTags(request.seasonTags())
                .servings(request.servings())
                .prepMinutes(request.prepMinutes())
                .cookMinutes(request.cookMinutes())
                .totalMinutes(request.totalMinutes())
                .kcalPerServing(request.kcalPerServing())
                .proteinG(request.proteinG())
                .carbG(request.carbG())
                .fatG(request.fatG())
                .isPublic(request.isPublic() != null && request.isPublic())
                .build());
        return toResponse(recipe);
    }

    private RecipeResponse toResponse(Recipe recipe) {
        return new RecipeResponse(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getDescription(),
                recipe.getImageUrl(),
                recipe.getCategory(),
                recipe.getSeasonTags(),
                recipe.getServings(),
                recipe.getPrepMinutes(),
                recipe.getCookMinutes(),
                recipe.getTotalMinutes(),
                recipe.getKcalPerServing(),
                recipe.getProteinG(),
                recipe.getCarbG(),
                recipe.getFatG(),
                recipe.getIsPublic(),
                recipe.getAuthorUser() != null ? recipe.getAuthorUser().getId() : null,
                recipe.getAuthorUser() != null ? recipe.getAuthorUser().getUsername() : null,
                recipe.getCreatedAt()
        );
    }
}
