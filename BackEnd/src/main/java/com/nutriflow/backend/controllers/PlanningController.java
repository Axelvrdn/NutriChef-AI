package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.planning.AddSlotRequest;
import com.nutriflow.backend.dtos.planning.CurrentWeekPlanResponse;
import com.nutriflow.backend.dtos.planning.UpdateSlotRequest;
import com.nutriflow.backend.services.PlanningService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/planning")
@RequiredArgsConstructor
public class PlanningController {

    private final PlanningService planningService;

    @GetMapping("/current-week")
    public CurrentWeekPlanResponse getCurrentWeekPlan() {
        return planningService.getCurrentWeekPlan();
    }

    @GetMapping("/week")
    public CurrentWeekPlanResponse getWeekPlan(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart
    ) {
        return planningService.getWeekPlan(weekStart);
    }

    @PostMapping("/slots")
    public CurrentWeekPlanResponse addSlot(@RequestBody AddSlotRequest request) {
        return planningService.addSlot(request);
    }

    @PatchMapping("/slots/{id}")
    public CurrentWeekPlanResponse updateSlot(@PathVariable UUID id, @RequestBody UpdateSlotRequest request) {
        return planningService.updateSlot(id, request);
    }

    @DeleteMapping("/slots/{id}")
    public CurrentWeekPlanResponse deleteSlot(@PathVariable UUID id) {
        return planningService.deleteSlot(id);
    }
}
