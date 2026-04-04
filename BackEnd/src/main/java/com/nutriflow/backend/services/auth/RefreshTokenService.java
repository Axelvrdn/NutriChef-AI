package com.nutriflow.backend.services.auth;

import com.nutriflow.backend.entities.RefreshToken;
import com.nutriflow.backend.entities.User;
import com.nutriflow.backend.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    private static final SecureRandom RANDOM = new SecureRandom();

    @Value("${nutriflow.jwt.refresh-token-expiration-ms}")
    private long refreshTokenExpirationMs;

    @Transactional
    public RefreshToken create(User user) {
        cleanupExpired();
        var now = LocalDateTime.now();
        var token = RefreshToken.builder()
                .user(user)
                .token(generateToken())
                .expiresAt(now.plus(refreshTokenExpirationMs, ChronoUnit.MILLIS))
                .revoked(false)
                .build();
        return refreshTokenRepository.save(token);
    }

    @Transactional
    public RefreshToken rotate(RefreshToken previous) {
        previous.setRevoked(true);
        refreshTokenRepository.save(previous);
        return create(previous.getUser());
    }

    @Transactional
    public void revokeAllUserTokens(User user) {
        var tokens = refreshTokenRepository.findAllByUserAndRevokedFalse(user);
        for (var token : tokens) {
            token.setRevoked(true);
        }
        refreshTokenRepository.saveAll(tokens);
    }

    @Transactional(readOnly = true)
    public RefreshToken requireUsableToken(String token) {
        var refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Refresh token invalide."));
        if (Boolean.TRUE.equals(refreshToken.getRevoked())) {
            throw new IllegalArgumentException("Refresh token révoqué.");
        }
        if (refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Refresh token expiré.");
        }
        return refreshToken;
    }

    @Transactional
    public void cleanupExpired() {
        refreshTokenRepository.deleteAllByExpiresAtBefore(LocalDateTime.now());
    }

    private String generateToken() {
        byte[] bytes = new byte[64];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
