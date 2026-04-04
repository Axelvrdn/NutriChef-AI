package com.nutriflow.backend.dtos.discover;

import com.nutriflow.backend.entities.DiscoverPost;

import java.time.LocalDateTime;
import java.util.UUID;

public record DiscoverFeedItemResponse(
        UUID id,
        String title,
        String body,
        String imageUrl,
        DiscoverPost.PostType type,
        Boolean isCurated,
        Integer shareCount,
        LocalDateTime createdAt,
        UUID authorId,
        String authorUsername,
        String authorDisplayName,
        String authorAvatarUrl,
        UUID recipeId,
        String recipeTitle
) {
}
