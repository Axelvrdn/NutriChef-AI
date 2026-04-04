package com.nutriflow.backend.config;

import com.nutriflow.backend.entities.*;
import com.nutriflow.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.List;
import java.util.Locale;

/**
 * Jeu de données DEV — s'exécute au démarrage uniquement si la BDD est vide.
 * Données calquées sur les maquettes du prototype (Elena Rose, feed Découvrir,
 * planning semaine, collections, abonnement premium).
 *
 * Actif uniquement avec le profil "dev" (spring.profiles.active=dev).
 */
@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final RecipeRepository recipeRepository;
    private final WeeklyPlanRepository weeklyPlanRepository;
    private final MealSlotRepository mealSlotRepository;
    private final DiscoverPostRepository discoverPostRepository;
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final RecipeCollectionRepository recipeCollectionRepository;
    private final UserFollowRepository userFollowRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("[DEV] BDD déjà peuplée — seed ignoré.");
            return;
        }

        log.info("[DEV] BDD vide — démarrage du seed...");

        // ── 1. Utilisateurs ──────────────────────────────────────────────────

        User elena = userRepository.save(User.builder()
                .email("elena.rose@studio.com")
                .username("elena_rose")
                .passwordHash("$2a$12$devHashNotForProd")
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .build());

        User julianne = userRepository.save(User.builder()
                .email("julianne.morel@studio.com")
                .username("julianne_morel")
                .passwordHash("$2a$12$devHashNotForProd")
                .role(User.Role.NUTRITIONIST)
                .status(User.Status.ACTIVE)
                .build());

        User marcus = userRepository.save(User.builder()
                .email("marcus.chen@studio.com")
                .username("marcus_chen")
                .passwordHash("$2a$12$devHashNotForProd")
                .role(User.Role.USER)
                .status(User.Status.ACTIVE)
                .build());

        // ── 2. Profils utilisateurs ───────────────────────────────────────────

        userProfileRepository.save(UserProfile.builder()
                .user(elena)
                .displayName("Elena Rose")
                .subtitle("Culinary Alchemist & Wellness Guide")
                .bio("Passionnée par la nutrition holistique. Je transforme des ingrédients simples en rituels de santé quotidiens. Ma cuisine est une apothicairerie moderne où chaque saveur a un but.")
                .avatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=elena")
                .gender(UserProfile.Gender.FEMME)
                .birthDate(LocalDate.of(1993, 4, 15))
                .heightCm(168.0)
                .activityLevel(UserProfile.ActivityLevel.ACTIF)
                .goal(UserProfile.Goal.MAINTIEN)
                .cookingLevel(UserProfile.CookingLevel.AVANCE)
                .dietPreferences("[\"vegetarian\"]")
                .intolerances("[\"lactose\"]")
                .allergies("[]")
                .kcalGoal(2000)
                .proteinGoalG(80)
                .carbGoalG(220)
                .fatGoalG(65)
                .hydrationGoalMl(2500)
                .build());

        userProfileRepository.save(UserProfile.builder()
                .user(julianne)
                .displayName("Julianne Morel")
                .subtitle("Nutritionniste Diplômée")
                .bio("Spécialisée en nutrition fonctionnelle et médecine préventive.")
                .avatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=julianne")
                .gender(UserProfile.Gender.FEMME)
                .birthDate(LocalDate.of(1989, 9, 22))
                .heightCm(162.0)
                .activityLevel(UserProfile.ActivityLevel.ACTIF)
                .goal(UserProfile.Goal.MAINTIEN)
                .cookingLevel(UserProfile.CookingLevel.INTERMEDIAIRE)
                .dietPreferences("[]")
                .intolerances("[]")
                .allergies("[]")
                .kcalGoal(1900)
                .hydrationGoalMl(2000)
                .build());

        userProfileRepository.save(UserProfile.builder()
                .user(marcus)
                .displayName("Marcus Chen")
                .subtitle("Herboriste & Dépôt")
                .bio("Explorateur des plantes adaptogènes et de la médecine traditionnelle chinoise.")
                .avatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=marcus")
                .gender(UserProfile.Gender.HOMME)
                .birthDate(LocalDate.of(1991, 2, 8))
                .heightCm(178.0)
                .activityLevel(UserProfile.ActivityLevel.ACTIF)
                .goal(UserProfile.Goal.MAINTIEN)
                .cookingLevel(UserProfile.CookingLevel.AVANCE)
                .dietPreferences("[\"vegan\"]")
                .intolerances("[]")
                .allergies("[]")
                .kcalGoal(2200)
                .hydrationGoalMl(2800)
                .build());

        // ── 3. Abonnement premium Elena (expire dans 3 jours → bandeau d'alerte) ──

        userSubscriptionRepository.save(UserSubscription.builder()
                .user(elena)
                .plan(UserSubscription.Plan.PREMIUM)
                .status(UserSubscription.SubscriptionStatus.ACTIVE)
                .startedAt(LocalDateTime.now().minusMonths(11))
                .expiresAt(LocalDateTime.now().plusDays(3))
                .build());

        // ── 4. Recettes (maquette "Mes Recettes") ────────────────────────────

        Recipe quinoa = recipeRepository.save(Recipe.builder()
                .authorUser(elena)
                .title("Bol de Quinoa Vert & Tahini")
                .description("Un mélange vibrant de pousses d'épinards, brocolis croquants et sauce crémeuse.")
                .imageUrl("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400")
                .category("DÉJEUNER SANTÉ")
                .seasonTags("[\"printemps\",\"ete\"]")
                .difficulty(Recipe.Difficulty.FACILE)
                .servings(2)
                .prepMinutes(10)
                .cookMinutes(5)
                .totalMinutes(15)
                .kcalPerServing(420.0)
                .proteinG(18.0)
                .carbG(52.0)
                .fatG(14.0)
                .isPublic(true)
                .build());

        Recipe veloute = recipeRepository.save(Recipe.builder()
                .authorUser(julianne)
                .title("Velouté de Courge & Sauge")
                .description("La douceur de la courge butternut relevée par des éclats de noisettes grillées.")
                .imageUrl("https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400")
                .category("CONFORT AUTOMNAL")
                .seasonTags("[\"automne\",\"hiver\"]")
                .difficulty(Recipe.Difficulty.FACILE)
                .servings(4)
                .prepMinutes(15)
                .cookMinutes(30)
                .totalMinutes(45)
                .kcalPerServing(280.0)
                .proteinG(6.0)
                .carbG(38.0)
                .fatG(12.0)
                .isPublic(true)
                .build());

        Recipe linguine = recipeRepository.save(Recipe.builder()
                .authorUser(elena)
                .title("Linguine au Pesto de Roquette")
                .description("Une interprétation moderne du pesto classique, plus poivrée et rafraîchissante.")
                .imageUrl("https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400")
                .category("DÎNER LÉGER")
                .seasonTags("[\"printemps\",\"ete\"]")
                .difficulty(Recipe.Difficulty.FACILE)
                .servings(2)
                .prepMinutes(10)
                .cookMinutes(10)
                .totalMinutes(20)
                .kcalPerServing(510.0)
                .proteinG(16.0)
                .carbG(72.0)
                .fatG(18.0)
                .isPublic(true)
                .build());

        Recipe saladeBotanique = recipeRepository.save(Recipe.builder()
                .authorUser(elena)
                .title("Salade de Botanique Fruitière")
                .description("Agrumes, pétales de calendula et sirop de lavande fait maison.")
                .imageUrl("https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400")
                .category("PETIT-DÉJEUNER")
                .seasonTags("[\"printemps\",\"ete\"]")
                .difficulty(Recipe.Difficulty.FACILE)
                .servings(1)
                .prepMinutes(10)
                .cookMinutes(0)
                .totalMinutes(10)
                .kcalPerServing(190.0)
                .proteinG(4.0)
                .carbG(42.0)
                .fatG(2.0)
                .isPublic(true)
                .build());

        Recipe racines = recipeRepository.save(Recipe.builder()
                .authorUser(marcus)
                .title("Racines Rôties au Miel Sauvage")
                .description("Carottes fanes et radis d'hiver glacés au vinaigre balsamique blanc.")
                .imageUrl("https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400")
                .category("ACCOMPAGNEMENT")
                .seasonTags("[\"automne\",\"hiver\"]")
                .difficulty(Recipe.Difficulty.MOYEN)
                .servings(4)
                .prepMinutes(15)
                .cookMinutes(30)
                .totalMinutes(45)
                .kcalPerServing(160.0)
                .proteinG(2.0)
                .carbG(28.0)
                .fatG(5.0)
                .isPublic(true)
                .build());

        Recipe saumon = recipeRepository.save(Recipe.builder()
                .authorUser(julianne)
                .title("Saumon Unilatéral & Asperges")
                .description("Une cuisson parfaite pour préserver les oméga-3 et le croquant des légumes.")
                .imageUrl("https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400")
                .category("PROTÉINES MARINES")
                .seasonTags("[\"printemps\",\"ete\"]")
                .difficulty(Recipe.Difficulty.MOYEN)
                .servings(2)
                .prepMinutes(5)
                .cookMinutes(20)
                .totalMinutes(25)
                .kcalPerServing(380.0)
                .proteinG(36.0)
                .carbG(8.0)
                .fatG(22.0)
                .isPublic(true)
                .build());

        // ── 5. Planning de la semaine courante (Elena) ───────────────────────

        LocalDate today = LocalDate.now();
        LocalDate monday = today.with(WeekFields.of(Locale.FRANCE).dayOfWeek(), 1);

        WeeklyPlan plan = weeklyPlanRepository.save(WeeklyPlan.builder()
                .user(elena)
                .weekStartDate(monday)
                .status(WeeklyPlan.Status.ACTIVE)
                .build());

        // Lundi
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(1)
                .mealType(MealSlot.MealType.BREAKFAST)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(quinoa)
                .note("Smoothie Détox à la Spiruline")
                .build());
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(1)
                .mealType(MealSlot.MealType.DINNER)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(veloute)
                .note("Bouillon d'Hiver aux Racines")
                .build());

        // Mardi
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(2)
                .mealType(MealSlot.MealType.LUNCH)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(quinoa)
                .note("Bol de Quinoa aux Herbes")
                .build());
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(2)
                .mealType(MealSlot.MealType.DINNER)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(linguine)
                .note("Tofu Braisé au Miso")
                .build());

        // Mercredi
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(3)
                .mealType(MealSlot.MealType.LUNCH)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(saumon)
                .build());
        mealSlotRepository.save(MealSlot.builder()
                .weeklyPlan(plan).dayOfWeek(3)
                .mealType(MealSlot.MealType.DINNER)
                .locationType(MealSlot.LocationType.HOME)
                .recipe(racines)
                .build());

        // ── 6. Posts Découvrir ────────────────────────────────────────────────

        DiscoverPost postJulianne = discoverPostRepository.save(DiscoverPost.builder()
                .author(julianne)
                .title("Le Rituel du Matin : Bol d'Énergie Verte")
                .body("Commencer la journée par des lipides sains permet une clarté mentale durable. Ce mélange d'avocat, graines de courge et œufs pochés est mon secret pour un focus optimal jusqu'au déjeuner.")
                .imageUrl("https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=600")
                .type(DiscoverPost.PostType.TIP)
                .isCurated(true)
                .shareCount(12)
                .recipe(quinoa)
                .build());

        DiscoverPost postMarcus = discoverPostRepository.save(DiscoverPost.builder()
                .author(marcus)
                .title("Infusions Adaptogènes pour le Sommeil")
                .body("L'ashwagandha et la mélisse ne sont pas juste des tendances. Utilisées avec parcimonie dans une infusion tiède à 20h, elles préparent le système nerveux à une régénération profonde.")
                .imageUrl("https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600")
                .type(DiscoverPost.PostType.USER_POST)
                .isCurated(false)
                .shareCount(45)
                .build());

        // Posts curatés pour la section "Inspirations" du tableau de bord
        discoverPostRepository.save(DiscoverPost.builder()
                .author(julianne)
                .title("Cuisiner les racines d'hiver")
                .body("Découvrez comment transformer les légumes anciens en chefs-d'œuvre saisonniers.")
                .imageUrl("https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400")
                .type(DiscoverPost.PostType.EDITORIAL)
                .isCurated(true)
                .shareCount(8)
                .build());
        discoverPostRepository.save(DiscoverPost.builder()
                .author(marcus)
                .title("Le pouvoir des Oméga-3")
                .body("Pourquoi les graisses saines sont vos meilleures alliées pour la concentration.")
                .imageUrl("https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400")
                .type(DiscoverPost.PostType.EDITORIAL)
                .isCurated(true)
                .shareCount(23)
                .build());
        discoverPostRepository.save(DiscoverPost.builder()
                .author(elena)
                .title("Protéines Vertes : Le Guide")
                .body("Quelles sources privilégier pour une récupération musculaire optimale sans protéines animales.")
                .imageUrl("https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400")
                .type(DiscoverPost.PostType.EDITORIAL)
                .isCurated(true)
                .shareCount(31)
                .build());

        // ── 7. Collections de recettes (Mes Listes sur la page Profil) ───────

        RecipeCollection rituels = recipeCollectionRepository.save(RecipeCollection.builder()
                .user(elena)
                .title("Rituels du Matin")
                .description("Mes recettes pour bien commencer la journée — légèreté et énergie durable.")
                .coverImageUrl("https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300")
                .isPublic(true)
                .build());

        recipeCollectionRepository.save(RecipeCollection.builder()
                .user(elena)
                .title("Dîners Légers")
                .description("Repas du soir digestes et savoureux pour une nuit réparatrice.")
                .coverImageUrl("https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300")
                .isPublic(true)
                .build());

        recipeCollectionRepository.save(RecipeCollection.builder()
                .user(elena)
                .title("Cuisine Solaire")
                .description("Recettes printanières et estivales qui célèbrent les couleurs du marché.")
                .coverImageUrl("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300")
                .isPublic(true)
                .build());

        recipeCollectionRepository.save(RecipeCollection.builder()
                .user(marcus)
                .title("Secrets d'Herboriste")
                .description("Une sélection de mélanges et d'infusions pour soutenir votre digestion naturelle.")
                .coverImageUrl("https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300")
                .isPublic(true)
                .build());

        // ── 8. Abonnements (user_follows) ─────────────────────────────────────

        userFollowRepository.save(UserFollow.builder()
                .id(new UserFollowId(julianne.getId(), elena.getId()))
                .follower(julianne)
                .followed(elena)
                .build());
        userFollowRepository.save(UserFollow.builder()
                .id(new UserFollowId(marcus.getId(), elena.getId()))
                .follower(marcus)
                .followed(elena)
                .build());
        userFollowRepository.save(UserFollow.builder()
                .id(new UserFollowId(elena.getId(), julianne.getId()))
                .follower(elena)
                .followed(julianne)
                .build());
        userFollowRepository.save(UserFollow.builder()
                .id(new UserFollowId(elena.getId(), marcus.getId()))
                .follower(elena)
                .followed(marcus)
                .build());

        log.info("[DEV] Seed terminé : {} users, {} recettes, {} posts, {} collections.",
                userRepository.count(),
                recipeRepository.count(),
                discoverPostRepository.count(),
                recipeCollectionRepository.count());
    }
}
