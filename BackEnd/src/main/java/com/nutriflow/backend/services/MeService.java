package com.nutriflow.backend.services;

import com.nutriflow.backend.dtos.me.MeResponse;
import com.nutriflow.backend.dtos.me.UpdateProfileRequest;
import com.nutriflow.backend.entities.UserProfile;
import com.nutriflow.backend.repositories.UserProfileRepository;
import com.nutriflow.backend.services.security.AuthenticatedUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MeService {

    private final AuthenticatedUserService authenticatedUserService;
    private final UserProfileRepository userProfileRepository;

    @Transactional(readOnly = true)
    public MeResponse getCurrentMe() {
        var user = authenticatedUserService.requireCurrentUser();
        var profile = requireProfile(user.getId());

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

    @Transactional
    public MeResponse updateProfile(UpdateProfileRequest request) {
        var user = authenticatedUserService.requireCurrentUser();
        var profile = requireProfile(user.getId());

        if (request.displayName() != null) profile.setDisplayName(request.displayName());
        if (request.subtitle() != null) profile.setSubtitle(request.subtitle());
        if (request.bio() != null) profile.setBio(request.bio());
        if (request.gender() != null) profile.setGender(request.gender());
        if (request.birthDate() != null) profile.setBirthDate(request.birthDate());
        if (request.heightCm() != null) profile.setHeightCm(request.heightCm());
        if (request.activityLevel() != null) profile.setActivityLevel(request.activityLevel());
        if (request.goal() != null) profile.setGoal(request.goal());
        if (request.cookingLevel() != null) profile.setCookingLevel(request.cookingLevel());
        if (request.dietPreferences() != null) profile.setDietPreferences(request.dietPreferences());
        if (request.intolerances() != null) profile.setIntolerances(request.intolerances());
        if (request.kcalGoal() != null) profile.setKcalGoal(request.kcalGoal());
        if (request.hydrationGoalMl() != null) profile.setHydrationGoalMl(request.hydrationGoalMl());

        userProfileRepository.save(profile);
        return getCurrentMe();
    }

    private UserProfile requireProfile(UUID userId) {
        return userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profil introuvable."));
    }
}
