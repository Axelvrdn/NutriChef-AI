package com.nutriflow.backend.services.auth;

import com.nutriflow.backend.dtos.auth.AuthResponse;
import com.nutriflow.backend.dtos.auth.AuthUserResponse;
import com.nutriflow.backend.dtos.auth.LoginRequest;
import com.nutriflow.backend.dtos.auth.RegisterRequest;
import com.nutriflow.backend.entities.User;
import com.nutriflow.backend.entities.UserProfile;
import com.nutriflow.backend.repositories.UserProfileRepository;
import com.nutriflow.backend.repositories.UserRepository;
import com.nutriflow.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Value("${nutriflow.jwt.access-token-expiration-ms}")
    private long accessTokenExpirationMs;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email déjà utilisé.");
        }
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username déjà utilisé.");
        }

        User user = userRepository.save(User.builder()
                .email(request.email().trim().toLowerCase())
                .username(request.username().trim())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .build());

        userProfileRepository.save(UserProfile.builder()
                .user(user)
                .displayName(request.displayName())
                .gender(UserProfile.Gender.AUTRE)
                .birthDate(LocalDate.now().minusYears(18))
                .heightCm(170.0)
                .activityLevel(UserProfile.ActivityLevel.SEDENTAIRE)
                .goal(UserProfile.Goal.MAINTIEN)
                .build());

        return issueTokens(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password())
        );

        User user = userRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Identifiants invalides."));

        if (user.getStatus() == User.Status.DISABLED) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Compte désactivé.");
        }

        refreshTokenService.revokeAllUserTokens(user);
        return issueTokens(user);
    }

    @Transactional
    public AuthResponse refresh(String refreshTokenValue) {
        var previous = refreshTokenService.requireUsableToken(refreshTokenValue);
        User user = previous.getUser();
        var rotated = refreshTokenService.rotate(previous);
        String accessToken = jwtService.generateAccessToken(user);

        return new AuthResponse(
                "Bearer",
                accessToken,
                rotated.getToken(),
                accessTokenExpirationMs / 1000,
                toAuthUser(user)
        );
    }

    private AuthResponse issueTokens(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        var refreshToken = refreshTokenService.create(user);
        return new AuthResponse(
                "Bearer",
                accessToken,
                refreshToken.getToken(),
                accessTokenExpirationMs / 1000,
                toAuthUser(user)
        );
    }

    private AuthUserResponse toAuthUser(User user) {
        return new AuthUserResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.getStatus()
        );
    }
}
