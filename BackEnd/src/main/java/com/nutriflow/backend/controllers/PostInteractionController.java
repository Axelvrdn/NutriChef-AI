package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.discover.AddPostCommentRequest;
import com.nutriflow.backend.dtos.discover.PostCommentResponse;
import com.nutriflow.backend.services.PostInteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/discover")
@RequiredArgsConstructor
public class PostInteractionController {

    private final PostInteractionService postInteractionService;

    @PostMapping("/posts/{id}/like")
    public Map<String, Boolean> toggleLike(@PathVariable UUID id) {
        return Map.of("liked", postInteractionService.toggleLike(id));
    }

    @GetMapping("/posts/{id}/comments")
    public List<PostCommentResponse> getComments(@PathVariable UUID id) {
        return postInteractionService.getComments(id);
    }

    @PostMapping("/posts/{id}/comments")
    public PostCommentResponse addComment(@PathVariable UUID id, @RequestBody AddPostCommentRequest request) {
        return postInteractionService.addComment(id, request);
    }

    @DeleteMapping("/comments/{commentId}")
    public void deleteComment(@PathVariable UUID commentId) {
        postInteractionService.deleteComment(commentId);
    }

    @PostMapping("/posts/{id}/share")
    public Map<String, Integer> registerShare(@PathVariable UUID id) {
        return Map.of("shareCount", postInteractionService.registerShare(id));
    }
}
