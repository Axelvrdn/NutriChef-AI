package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "author_user_id")
    private User authorUser;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private Integer servings;

    @Column(name = "prep_minutes")
    private Integer prepMinutes;

    @Column(name = "cook_minutes")
    private Integer cookMinutes;

    @Column(name = "total_minutes")
    private Integer totalMinutes;

    @Column(name = "kcal_per_serving")
    private Double kcalPerServing;

    @Column(name = "protein_g")
    private Double proteinG;

    @Column(name = "carb_g")
    private Double carbG;

    @Column(name = "fat_g")
    private Double fatG;

    /** URL de l'image principale (CDN ou stockage objet) */
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * Label catégorie éditorial affiché sur la carte :
     * ex. "DÎNER LÉGER", "PROTÉINES MARINES", "ACCOMPAGNEMENT"
     */
    @Column(name = "category")
    private String category;

    /**
     * Tags saisonniers pour le filtre "Saison" :
     * jsonb ex. ["printemps","ete"] — valeurs : printemps, ete, automne, hiver
     */
    @Column(name = "season_tags", columnDefinition = "jsonb")
    private String seasonTags;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum Difficulty {
        FACILE,
        MOYEN,
        DIFFICILE
    }

    @PrePersist
    protected void onCreate() {
        var now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.isPublic == null) {
            this.isPublic = false;
        }
        if (this.servings == null) {
            this.servings = 1;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

