package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.recipes.CreateRecipeRequest;
import com.nutriflow.backend.dtos.recipes.RecipeResponse;
import com.nutriflow.backend.services.RecipeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping
    public List<RecipeResponse> getRecipes() {
        return recipeService.getRecipesForCurrentUser();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeResponse createRecipe(@Valid @RequestBody CreateRecipeRequest request) {
        return recipeService.createRecipe(request);
    }
}
