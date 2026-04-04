package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.me.MeResponse;
import com.nutriflow.backend.entities.User;
import com.nutriflow.backend.security.CustomUserDetailsService;
import com.nutriflow.backend.security.JwtAuthenticationFilter;
import com.nutriflow.backend.services.MeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MeController.class)
@AutoConfigureMockMvc(addFilters = false)
class MeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MeService meService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void getMe_returnsCurrentUserProfile() throws Exception {
        when(meService.getCurrentMe()).thenReturn(new MeResponse(
                UUID.randomUUID(),
                "elena.rose@studio.com",
                "elena_rose",
                User.Role.USER,
                User.Status.ACTIVE,
                "Elena Rose",
                "Culinary Alchemist & Wellness Guide",
                "bio",
                "avatar",
                2000,
                2500,
                "[\"vegetarian\"]",
                "[\"lactose\"]",
                "[]"
        ));

        mockMvc.perform(get("/api/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("elena.rose@studio.com"))
                .andExpect(jsonPath("$.displayName").value("Elena Rose"));
    }
}
