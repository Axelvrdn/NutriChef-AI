package com.nutriflow.backend.controllers;

import com.nutriflow.backend.dtos.discover.DiscoverFeedItemResponse;
import com.nutriflow.backend.services.DiscoverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/discover")
@RequiredArgsConstructor
public class DiscoverController {

    private final DiscoverService discoverService;

    @GetMapping("/feed")
    public List<DiscoverFeedItemResponse> getFeed(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return discoverService.getFeed(page, size);
    }
}
