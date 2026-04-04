package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.me.MeResponse;
import com.nutriflow.backend.services.MeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MeController {

    private final MeService meService;

    @GetMapping
    public MeResponse getMe() {
        return meService.getCurrentMe();
    }
}
