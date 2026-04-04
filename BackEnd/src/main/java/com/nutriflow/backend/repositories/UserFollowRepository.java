package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.UserFollow;
import com.nutriflow.backend.entities.UserFollowId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFollowRepository extends JpaRepository<UserFollow, UserFollowId> {
}
