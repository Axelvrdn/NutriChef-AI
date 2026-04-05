package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.meallog.AddMealLogItemRequest;
import com.nutriflow.backend.dtos.meallog.DailyLogResponse;
import com.nutriflow.backend.dtos.meallog.MealLogItemResponse;
import com.nutriflow.backend.entities.MealLog;
import com.nutriflow.backend.entities.MealLogItem;
import com.nutriflow.backend.repositories.MealLogItemRepository;
import com.nutriflow.backend.repositories.MealLogRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealLogService {

    private final AuthenticatedUserService authenticatedUserService;
    private final MealLogRepository mealLogRepository;
    private final MealLogItemRepository mealLogItemRepository;

    @Transactional
    public DailyLogResponse getDailyLog(LocalDate logDate) {
        var user = authenticatedUserService.requireCurrentUser();
        var mealLog = mealLogRepository.findByUserIdAndLogDate(user.getId(), logDate)
                .orElseGet(() -> mealLogRepository.save(
                        MealLog.builder()
                                .user(user)
                                .logDate(logDate)
                                .build()
                ));

        return toResponse(mealLog);
    }

    @Transactional
    public DailyLogResponse addItem(AddMealLogItemRequest request) {
        var user = authenticatedUserService.requireCurrentUser();
        var today = LocalDate.now();
        var mealLog = mealLogRepository.findByUserIdAndLogDate(user.getId(), today)
                .orElseGet(() -> mealLogRepository.save(
                        MealLog.builder()
                                .user(user)
                                .logDate(today)
                                .build()
                ));

        var item = MealLogItem.builder()
                .mealLog(mealLog)
                .mealType(request.mealType() != null ? request.mealType() : MealLogItem.MealType.SNACK)
                .sourceType(MealLogItem.SourceType.MANUAL)
                .label(request.label())
                .quantity(request.quantity() != null ? request.quantity() : 1D)
                .unit(request.unit() != null ? request.unit() : "portion")
                .kcal(request.kcal())
                .proteinG(request.proteinG())
                .carbG(request.carbG())
                .fatG(request.fatG())
                .build();
        mealLogItemRepository.save(item);

        return toResponse(mealLog);
    }

    private DailyLogResponse toResponse(MealLog mealLog) {
        List<MealLogItemResponse> items = mealLogItemRepository.findAllByMealLogIdOrderByConsumedAtDesc(mealLog.getId())
                .stream()
                .map(item -> new MealLogItemResponse(
                        item.getId(),
                        item.getMealType(),
                        item.getSourceType(),
                        item.getLabel() != null
                                ? item.getLabel()
                                : (item.getOffProduct() != null ? item.getOffProduct().getProductName() : "Entrée manuelle"),
                        item.getQuantity(),
                        item.getUnit(),
                        item.getKcal(),
                        item.getProteinG(),
                        item.getCarbG(),
                        item.getFatG(),
                        item.getConsumedAt()
                ))
                .toList();

        double totalKcal = items.stream().mapToDouble(i -> i.kcal() != null ? i.kcal() : 0D).sum();
        double totalProtein = items.stream().mapToDouble(i -> i.proteinG() != null ? i.proteinG() : 0D).sum();
        double totalCarb = items.stream().mapToDouble(i -> i.carbG() != null ? i.carbG() : 0D).sum();
        double totalFat = items.stream().mapToDouble(i -> i.fatG() != null ? i.fatG() : 0D).sum();

        return new DailyLogResponse(
                mealLog.getLogDate(),
                totalKcal,
                totalProtein,
                totalCarb,
                totalFat,
                items
        );
    }
}
