package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "meal_log_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealLogItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "meal_log_id", nullable = false)
    private MealLog mealLog;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Enumerated(EnumType.STRING)
    @Column(name = "source_type", nullable = false)
    private SourceType sourceType;

    @ManyToOne
    @JoinColumn(name = "off_product_id")
    private Food offProduct;

    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "kcal")
    private Double kcal;

    @Column(name = "protein_g")
    private Double proteinG;

    @Column(name = "carb_g")
    private Double carbG;

    @Column(name = "fat_g")
    private Double fatG;

    @Column(name = "consumed_at")
    private LocalDateTime consumedAt;

    @PrePersist
    protected void onCreate() {
        if (this.consumedAt == null) {
            this.consumedAt = LocalDateTime.now();
        }
    }

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }

    public enum SourceType {
        OFF_PRODUCT,
        MANUAL
    }
}

