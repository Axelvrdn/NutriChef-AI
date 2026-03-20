package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "foods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "calories_100g", nullable = false)
    private Double calories100g;

    @Column(nullable = false)
    private Double proteins;

    @Column(nullable = false)
    private Double carbs;

    @Column(nullable = false)
    private Double fats;
}

