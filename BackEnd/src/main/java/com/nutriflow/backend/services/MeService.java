package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.me.MeResponse;
import com.nutriflow.backend.repositories.UserProfileRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MeService {

    private final AuthenticatedUserService authenticatedUserService;
    private final UserProfileRepository userProfileRepository;

    @Transactional(readOnly = true)
    public MeResponse getCurrentMe() {
        var user = authenticatedUserService.requireCurrentUser();
        var profile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profil introuvable."));

        return new MeResponse(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.getStatus(),
                profile.getDisplayName(),
                profile.getSubtitle(),
                profile.getBio(),
                profile.getAvatarUrl(),
                profile.getKcalGoal(),
                profile.getHydrationGoalMl(),
                profile.getDietPreferences(),
                profile.getIntolerances(),
                profile.getAllergies()
        );
    }
}
