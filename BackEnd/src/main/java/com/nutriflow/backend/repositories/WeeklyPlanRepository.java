package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.WeeklyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WeeklyPlanRepository extends JpaRepository<WeeklyPlan, UUID> {
    Optional<WeeklyPlan> findByUserIdAndWeekStartDate(UUID userId, LocalDate weekStartDate);
}
