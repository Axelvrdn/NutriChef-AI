package com.nutriflow.backend.dtos.auth;

public record AuthResponse(
        String tokenType,
        String accessToken,
        String refreshToken,
        long expiresIn,
        AuthUserResponse user
) {
}
