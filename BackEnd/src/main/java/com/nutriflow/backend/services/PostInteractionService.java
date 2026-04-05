package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.discover.AddPostCommentRequest;
import com.nutriflow.backend.dtos.discover.PostCommentResponse;
import com.nutriflow.backend.entities.PostComment;
import com.nutriflow.backend.entities.PostLike;
import com.nutriflow.backend.entities.PostLikeId;
import com.nutriflow.backend.repositories.DiscoverPostRepository;
import com.nutriflow.backend.repositories.PostCommentRepository;
import com.nutriflow.backend.repositories.PostLikeRepository;
import com.nutriflow.backend.repositories.UserProfileRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostInteractionService {

    private final AuthenticatedUserService authenticatedUserService;
    private final DiscoverPostRepository discoverPostRepository;
    private final PostLikeRepository postLikeRepository;
    private final PostCommentRepository postCommentRepository;
    private final UserProfileRepository userProfileRepository;

    @Transactional
    public boolean toggleLike(UUID postId) {
        var user = authenticatedUserService.requireCurrentUser();
        var post = discoverPostRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post introuvable."));
        var likeId = new PostLikeId(user.getId(), post.getId());

        if (postLikeRepository.existsById(likeId)) {
            postLikeRepository.deleteById(likeId);
            return false;
        }

        postLikeRepository.save(PostLike.builder()
                .id(likeId)
                .user(user)
                .post(post)
                .build());
        return true;
    }

    @Transactional(readOnly = true)
    public List<PostCommentResponse> getComments(UUID postId) {
        discoverPostRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post introuvable."));

        return postCommentRepository.findAllByPost_IdOrderByCreatedAtDesc(postId)
                .stream()
                .map(comment -> {
                    var profileOpt = userProfileRepository.findByUserId(comment.getUser().getId());
                    return new PostCommentResponse(
                            comment.getId(),
                            comment.getUser().getUsername(),
                            profileOpt.map(p -> p.getAvatarUrl()).orElse(null),
                            comment.getContent(),
                            comment.getCreatedAt()
                    );
                })
                .toList();
    }

    @Transactional
    public PostCommentResponse addComment(UUID postId, AddPostCommentRequest request) {
        if (request.content() == null || request.content().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le commentaire ne peut pas être vide.");
        }

        var user = authenticatedUserService.requireCurrentUser();
        var post = discoverPostRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post introuvable."));

        var saved = postCommentRepository.save(PostComment.builder()
                .post(post)
                .user(user)
                .content(request.content().trim())
                .build());

        var avatar = userProfileRepository.findByUserId(user.getId()).map(p -> p.getAvatarUrl()).orElse(null);
        return new PostCommentResponse(saved.getId(), user.getUsername(), avatar, saved.getContent(), saved.getCreatedAt());
    }

    @Transactional
    public void deleteComment(UUID commentId) {
        var user = authenticatedUserService.requireCurrentUser();
        var comment = postCommentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Commentaire introuvable."));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vous ne pouvez pas supprimer ce commentaire.");
        }
        postCommentRepository.delete(comment);
    }

    @Transactional
    public int registerShare(UUID postId) {
        var post = discoverPostRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post introuvable."));
        post.setShareCount((post.getShareCount() != null ? post.getShareCount() : 0) + 1);
        discoverPostRepository.save(post);
        return post.getShareCount();
    }
}
