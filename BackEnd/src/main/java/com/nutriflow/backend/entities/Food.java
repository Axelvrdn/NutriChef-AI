package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "off_product_cache",
        indexes = @Index(name = "idx_off_product_cache_last_synced", columnList = "last_synced_at")
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "barcode", nullable = false, unique = true)
    private String barcode;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "quantity_text")
    private String quantityText;

    @Column(name = "kcal_100g")
    private Double kcal100g;

    @Column(name = "protein_100g")
    private Double protein100g;

    @Column(name = "carb_100g")
    private Double carb100g;

    @Column(name = "fat_100g")
    private Double fat100g;

    @Column(name = "salt_100g")
    private Double salt100g;

    @Column(name = "fiber_100g")
    private Double fiber100g;

    @Column(name = "raw_payload", columnDefinition = "jsonb")
    private String rawPayload;

    @Column(name = "last_synced_at", nullable = false)
    private LocalDateTime lastSyncedAt;

    @Column(name = "source_license", nullable = false)
    private String sourceLicense = "ODbL";

    @PrePersist
    protected void onCreate() {
        if (this.lastSyncedAt == null) {
            this.lastSyncedAt = LocalDateTime.now();
        }
    }
}

