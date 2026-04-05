package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, UUID> {
    List<PostComment> findAllByPost_IdOrderByCreatedAtDesc(UUID postId);

    long countByPost_Id(UUID postId);
}
