package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "meal_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name = "quantity_g", nullable = false)
    private Double quantityG;

    @Column(name = "consumed_at", nullable = false, updatable = false)
    private LocalDateTime consumedAt;

    @PrePersist
    protected void onCreate() {
        if (this.consumedAt == null) {
            this.consumedAt = LocalDateTime.now();
        }
    }

    public enum MealType {
        PETIT_DEJEUNER,
        DEJEUNER,
        DINER,
        COLLATION
    }
}

