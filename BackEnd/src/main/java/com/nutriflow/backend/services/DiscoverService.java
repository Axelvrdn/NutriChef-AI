package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.discover.DiscoverFeedItemResponse;
import com.nutriflow.backend.entities.PostLikeId;
import com.nutriflow.backend.repositories.DiscoverPostRepository;
import com.nutriflow.backend.repositories.PostCommentRepository;
import com.nutriflow.backend.repositories.PostLikeRepository;
import com.nutriflow.backend.repositories.UserProfileRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiscoverService {

    private final DiscoverPostRepository discoverPostRepository;
    private final UserProfileRepository userProfileRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostCommentRepository postCommentRepository;
    private final AuthenticatedUserService authenticatedUserService;

    @Transactional(readOnly = true)
    public List<DiscoverFeedItemResponse> getFeed(int page, int size) {
        int safePage = Math.max(0, page);
        int safeSize = Math.min(Math.max(1, size), 50);
        var currentUser = authenticatedUserService.requireCurrentUser();

        return discoverPostRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(safePage, safeSize))
                .stream()
                .map(post -> {
                    var profileOpt = userProfileRepository.findByUserId(post.getAuthor().getId());
                    long likeCount = postLikeRepository.countByPost_Id(post.getId());
                    long commentCount = postCommentRepository.countByPost_Id(post.getId());
                    boolean likedByCurrentUser = postLikeRepository.existsById(new PostLikeId(currentUser.getId(), post.getId()));
                    return new DiscoverFeedItemResponse(
                            post.getId(),
                            post.getTitle(),
                            post.getBody(),
                            post.getImageUrl(),
                            post.getType(),
                            post.getIsCurated(),
                            post.getShareCount(),
                            post.getCreatedAt(),
                            post.getAuthor().getId(),
                            post.getAuthor().getUsername(),
                            profileOpt.map(p -> p.getDisplayName()).orElse(null),
                            profileOpt.map(p -> p.getAvatarUrl()).orElse(null),
                            post.getRecipe() != null ? post.getRecipe().getId() : null,
                            post.getRecipe() != null ? post.getRecipe().getTitle() : null,
                            likeCount,
                            commentCount,
                            likedByCurrentUser
                    );
                })
                .toList();
    }
}
