package com.nutriflow.backend.entities;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RecipeCollectionItemId implements Serializable {
    private UUID collectionId;
    private UUID recipeId;
}
