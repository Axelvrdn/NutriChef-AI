package com.nutriflow.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nutriflow.backend.dtos.auth.AuthResponse;
import com.nutriflow.backend.dtos.auth.AuthUserResponse;
import com.nutriflow.backend.entities.User;
import com.nutriflow.backend.security.CustomUserDetailsService;
import com.nutriflow.backend.security.JwtAuthenticationFilter;
import com.nutriflow.backend.services.auth.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void register_returnsCreatedAndTokens() throws Exception {
        when(authService.register(any())).thenReturn(sampleAuthResponse());

        String payload = """
                {
                  "email":"test@nutri.com",
                  "username":"test_user",
                  "password":"password123",
                  "displayName":"Test User"
                }
                """;

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").value("access-token"))
                .andExpect(jsonPath("$.refreshToken").value("refresh-token"));
    }

    @Test
    void login_returnsOk() throws Exception {
        when(authService.login(any())).thenReturn(sampleAuthResponse());

        String payload = """
                {
                  "email":"test@nutri.com",
                  "password":"password123"
                }
                """;

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tokenType").value("Bearer"));
    }

    @Test
    void refresh_returnsOk() throws Exception {
        when(authService.refresh(any())).thenReturn(sampleAuthResponse());

        String payload = objectMapper.writeValueAsString(new Object() {
            public final String refreshToken = "refresh-token";
        });

        mockMvc.perform(post("/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("access-token"));
    }

    private AuthResponse sampleAuthResponse() {
        return new AuthResponse(
                "Bearer",
                "access-token",
                "refresh-token",
                900,
                new AuthUserResponse(
                        UUID.randomUUID(),
                        "test@nutri.com",
                        "test_user",
                        User.Role.USER,
                        User.Status.ACTIVE
                )
        );
    }
}
