package com.nutriflow.backend.dtos.discover;

import java.time.LocalDateTime;
import java.util.UUID;

public record PostCommentResponse(
        UUID id,
        String authorUsername,
        String authorAvatarUrl,
        String content,
        LocalDateTime createdAt
) {
}
