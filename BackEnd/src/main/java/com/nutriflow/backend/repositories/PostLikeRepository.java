package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.PostLike;
import com.nutriflow.backend.entities.PostLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, PostLikeId> {
    long countByPost_Id(UUID postId);
}
