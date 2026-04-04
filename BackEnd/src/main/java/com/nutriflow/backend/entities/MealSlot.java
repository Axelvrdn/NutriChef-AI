package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "meal_slots",
        indexes = @Index(name = "idx_meal_slots_plan_day_type", columnList = "weekly_plan_id,day_of_week,meal_type")
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "weekly_plan_id", nullable = false)
    private WeeklyPlan weeklyPlan;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek; // 1..7

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Enumerated(EnumType.STRING)
    @Column(name = "location_type", nullable = false)
    private LocationType locationType;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @Column(name = "note")
    private String note;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        var now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }

    public enum LocationType {
        HOME,
        RESTAURANT,
        OUTSIDE
    }
}

