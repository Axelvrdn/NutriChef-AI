package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.meallog.AddMealLogItemRequest;
import com.nutriflow.backend.dtos.meallog.DailyLogResponse;
import com.nutriflow.backend.services.MealLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/meal-log")
@RequiredArgsConstructor
public class MealLogController {

    private final MealLogService mealLogService;

    @GetMapping("/today")
    public DailyLogResponse getToday() {
        return mealLogService.getDailyLog(LocalDate.now());
    }

    @PostMapping("/items")
    public DailyLogResponse addItem(@RequestBody AddMealLogItemRequest request) {
        return mealLogService.addItem(request);
    }
}
