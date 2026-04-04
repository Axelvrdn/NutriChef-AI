package com.nutriflow.backend.dtos.auth;

import com.nutriflow.backend.entities.User;

import java.util.UUID;

public record AuthUserResponse(
        UUID id,
        String email,
        String username,
        User.Role role,
        User.Status status
) {
}
