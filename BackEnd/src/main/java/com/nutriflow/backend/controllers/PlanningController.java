package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.planning.CurrentWeekPlanResponse;
import com.nutriflow.backend.services.PlanningService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/planning")
@RequiredArgsConstructor
public class PlanningController {

    private final PlanningService planningService;

    @GetMapping("/current-week")
    public CurrentWeekPlanResponse getCurrentWeekPlan() {
        return planningService.getCurrentWeekPlan();
    }
}
