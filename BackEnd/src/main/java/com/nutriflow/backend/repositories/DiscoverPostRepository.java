package com.nutriflow.backend.repositories;

import com.nutriflow.backend.entities.DiscoverPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DiscoverPostRepository extends JpaRepository<DiscoverPost, UUID> {
    Page<DiscoverPost> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
