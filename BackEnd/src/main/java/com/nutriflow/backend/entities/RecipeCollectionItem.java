package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Relie une recette à une collection.
 * Le champ `position` permet d'ordonner les recettes dans la grille d'affichage.
 */
@Entity
@Table(
        name = "recipe_collection_items",
        indexes = @Index(name = "idx_recipe_collection_items_collection", columnList = "collection_id")
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeCollectionItem {

    @EmbeddedId
    private RecipeCollectionItemId id;

    @ManyToOne(optional = false)
    @MapsId("collectionId")
    @JoinColumn(name = "collection_id", nullable = false)
    private RecipeCollection collection;

    @ManyToOne(optional = false)
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "position")
    private Integer position;

    @Column(name = "added_at", nullable = false, updatable = false)
    private LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        this.addedAt = LocalDateTime.now();
    }
}
