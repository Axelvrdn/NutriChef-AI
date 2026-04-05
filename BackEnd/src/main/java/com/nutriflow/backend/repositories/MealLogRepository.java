package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, UUID> {
    Optional<MealLog> findByUserIdAndLogDate(UUID userId, LocalDate logDate);
}
