package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    private UUID id;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // --- Identité publique (profil affiché) ---

    @Column(name = "display_name")
    private String displayName;

    /** Ligne sous le nom : ex. "Culinary Alchemist & Wellness Guide" */
    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "bio", columnDefinition = "text")
    private String bio;

    @Column(name = "avatar_url")
    private String avatarUrl;

    // --- Données physiologiques ---

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "height_cm", nullable = false)
    private Double heightCm;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = false)
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Goal goal;

    // --- ADN Culinaire (Paramètres screen) ---

    @Enumerated(EnumType.STRING)
    @Column(name = "cooking_level")
    private CookingLevel cookingLevel;

    /** jsonb : ex. ["vegetarian","gluten_free","paleo"] */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "diet_preferences", columnDefinition = "jsonb")
    private String dietPreferences;

    /** jsonb : ex. ["lactose","arachides","crustaces"] */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "intolerances", columnDefinition = "jsonb")
    private String intolerances;

    /** jsonb : ex. ["gluten","fruits_a_coque"] */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "allergies", columnDefinition = "jsonb")
    private String allergies;

    // --- Objectifs nutritionnels (Tableau de bord) ---

    @Column(name = "kcal_goal")
    private Integer kcalGoal;

    @Column(name = "protein_goal_g")
    private Integer proteinGoalG;

    @Column(name = "carb_goal_g")
    private Integer carbGoalG;

    @Column(name = "fat_goal_g")
    private Integer fatGoalG;

    @Column(name = "hydration_goal_ml")
    private Integer hydrationGoalMl;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (this.updatedAt == null) {
            this.updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum Gender {
        HOMME,
        FEMME,
        AUTRE
    }

    public enum ActivityLevel {
        SEDENTAIRE,
        ACTIF,
        TRES_ACTIF
    }

    public enum Goal {
        PERTE,
        GAIN,
        MAINTIEN
    }

    public enum CookingLevel {
        DEBUTANT,
        INITIE,
        INTERMEDIAIRE,
        AVANCE
    }
}

