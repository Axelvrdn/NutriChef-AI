package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.MealLogItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MealLogItemRepository extends JpaRepository<MealLogItem, UUID> {
    List<MealLogItem> findAllByMealLogIdOrderByConsumedAtDesc(UUID mealLogId);
}
