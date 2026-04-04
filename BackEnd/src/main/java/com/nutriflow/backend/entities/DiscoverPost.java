package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "discover_posts",
        indexes = {
                @Index(name = "idx_discover_posts_author", columnList = "author_user_id"),
                @Index(name = "idx_discover_posts_created", columnList = "created_at")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscoverPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_user_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String body;

    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostType type;

    @Column(name = "is_curated", nullable = false)
    private Boolean isCurated;

    /**
     * Compteur dénormalisé mis à jour côté service pour éviter un COUNT(*) à chaque affichage.
     * Incrémenté quand l'utilisateur partage le lien (via l'icône "partager" de la carte).
     */
    @Column(name = "share_count", nullable = false)
    private Integer shareCount;

    // lien optionnel vers une recette si le post en partage une
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        var now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.isCurated == null) this.isCurated = false;
        if (this.shareCount == null) this.shareCount = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum PostType {
        RECIPE_SHARE,
        TIP,
        EDITORIAL,
        USER_POST
    }
}
