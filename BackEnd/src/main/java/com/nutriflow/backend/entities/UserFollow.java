package com.nutriflow.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_follows",
        indexes = {
                @Index(name = "idx_user_follows_follower", columnList = "follower_id"),
                @Index(name = "idx_user_follows_followed", columnList = "followed_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserFollow {

    @EmbeddedId
    private UserFollowId id;

    @ManyToOne(optional = false)
    @MapsId("followerId")
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @ManyToOne(optional = false)
    @MapsId("followedId")
    @JoinColumn(name = "followed_id", nullable = false)
    private User followed;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
