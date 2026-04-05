-- V1 schema bootstrap (aligned with JPA entities).

create table users (
    id uuid primary key default gen_random_uuid(),
    email varchar(255) not null,
    password_hash varchar(255) not null,
    username varchar(50),
    role varchar(255) not null,
    status varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint uk_users_email unique (email),
    constraint uk_users_username unique (username)
);

create table user_profiles (
    user_id uuid primary key,
    display_name varchar(255),
    subtitle varchar(255),
    bio text,
    avatar_url varchar(255),
    gender varchar(255) not null,
    birth_date date not null,
    height_cm double precision not null,
    activity_level varchar(255) not null,
    goal varchar(255) not null,
    cooking_level varchar(255),
    diet_preferences jsonb,
    intolerances jsonb,
    allergies jsonb,
    kcal_goal integer,
    protein_goal_g integer,
    carb_goal_g integer,
    fat_goal_g integer,
    hydration_goal_ml integer,
    updated_at timestamp not null,
    constraint fk_user_profiles_user foreign key (user_id) references users (id)
);

create table refresh_tokens (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    token text not null,
    expires_at timestamp not null,
    revoked boolean not null default false,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint uk_refresh_tokens_token unique (token),
    constraint fk_refresh_tokens_user foreign key (user_id) references users (id)
);
create index idx_refresh_tokens_user on refresh_tokens (user_id);
create index idx_refresh_tokens_expires_at on refresh_tokens (expires_at);

create table user_subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    plan varchar(255) not null,
    status varchar(255) not null,
    started_at timestamp not null,
    expires_at timestamp,
    external_ref varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_user_subscriptions_user foreign key (user_id) references users (id)
);
create index idx_user_subscriptions_user on user_subscriptions (user_id);

create table weight_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    weight_kg double precision not null,
    logged_at timestamp not null,
    constraint fk_weight_logs_user foreign key (user_id) references users (id)
);

create table off_product_cache (
    id uuid primary key default gen_random_uuid(),
    barcode varchar(255) not null,
    product_name varchar(255),
    brand varchar(255),
    quantity_text varchar(255),
    kcal_100g double precision,
    protein_100g double precision,
    carb_100g double precision,
    fat_100g double precision,
    salt_100g double precision,
    fiber_100g double precision,
    raw_payload jsonb,
    last_synced_at timestamp not null,
    source_license varchar(255) not null default 'ODbL',
    constraint uk_off_product_cache_barcode unique (barcode)
);
create index idx_off_product_cache_last_synced on off_product_cache (last_synced_at);

create table ingredients (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    default_unit varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null
);

create table recipes (
    id uuid primary key default gen_random_uuid(),
    author_user_id uuid,
    title varchar(255) not null,
    description text not null,
    servings integer not null,
    prep_minutes integer,
    cook_minutes integer,
    total_minutes integer,
    kcal_per_serving double precision,
    protein_g double precision,
    carb_g double precision,
    fat_g double precision,
    image_url varchar(255),
    category varchar(255),
    season_tags jsonb,
    difficulty varchar(255),
    is_public boolean not null default false,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_recipes_author_user foreign key (author_user_id) references users (id)
);

create table recipe_ingredients (
    recipe_id uuid not null,
    ingredient_id uuid not null,
    quantity double precision not null,
    unit varchar(255) not null,
    preparation_note varchar(255),
    primary key (recipe_id, ingredient_id),
    constraint fk_recipe_ingredients_recipe foreign key (recipe_id) references recipes (id),
    constraint fk_recipe_ingredients_ingredient foreign key (ingredient_id) references ingredients (id)
);

create table recipe_collections (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    title varchar(255) not null,
    description text,
    cover_image_url varchar(255),
    is_public boolean not null default false,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_recipe_collections_user foreign key (user_id) references users (id)
);
create index idx_recipe_collections_user on recipe_collections (user_id);

create table recipe_collection_items (
    collection_id uuid not null,
    recipe_id uuid not null,
    position integer,
    added_at timestamp not null,
    primary key (collection_id, recipe_id),
    constraint fk_recipe_collection_items_collection foreign key (collection_id) references recipe_collections (id),
    constraint fk_recipe_collection_items_recipe foreign key (recipe_id) references recipes (id)
);
create index idx_recipe_collection_items_collection on recipe_collection_items (collection_id);

create table weekly_plans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    week_start_date date not null,
    status varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint uk_weekly_plans_user_week_start unique (user_id, week_start_date),
    constraint fk_weekly_plans_user foreign key (user_id) references users (id)
);

create table meal_slots (
    id uuid primary key default gen_random_uuid(),
    weekly_plan_id uuid not null,
    day_of_week integer not null,
    meal_type varchar(255) not null,
    location_type varchar(255) not null,
    recipe_id uuid,
    note varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_meal_slots_weekly_plan foreign key (weekly_plan_id) references weekly_plans (id),
    constraint fk_meal_slots_recipe foreign key (recipe_id) references recipes (id)
);
create index idx_meal_slots_plan_day_type on meal_slots (weekly_plan_id, day_of_week, meal_type);

create table shopping_lists (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    week_start_date date,
    status varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_shopping_lists_user foreign key (user_id) references users (id)
);

create table shopping_list_items (
    id uuid primary key default gen_random_uuid(),
    shopping_list_id uuid not null,
    ingredient_id uuid,
    label varchar(255) not null,
    quantity double precision,
    unit varchar(255),
    is_checked boolean not null default false,
    off_product_id uuid,
    match_confidence double precision,
    substitution_json jsonb,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_shopping_list_items_list foreign key (shopping_list_id) references shopping_lists (id),
    constraint fk_shopping_list_items_ingredient foreign key (ingredient_id) references ingredients (id),
    constraint fk_shopping_list_items_off_product foreign key (off_product_id) references off_product_cache (id)
);

create table meal_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    log_date date not null,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_meal_logs_user foreign key (user_id) references users (id)
);

create table meal_log_items (
    id uuid primary key default gen_random_uuid(),
    meal_log_id uuid not null,
    meal_type varchar(255) not null,
    source_type varchar(255) not null,
    off_product_id uuid,
    label varchar(255),
    quantity double precision not null,
    unit varchar(255) not null,
    kcal double precision,
    protein_g double precision,
    carb_g double precision,
    fat_g double precision,
    consumed_at timestamp,
    constraint fk_meal_log_items_log foreign key (meal_log_id) references meal_logs (id),
    constraint fk_meal_log_items_off_product foreign key (off_product_id) references off_product_cache (id)
);

create table discover_posts (
    id uuid primary key default gen_random_uuid(),
    author_user_id uuid not null,
    title varchar(255) not null,
    body text not null,
    image_url varchar(255),
    type varchar(255) not null,
    is_curated boolean not null default false,
    share_count integer not null default 0,
    recipe_id uuid,
    created_at timestamp not null,
    updated_at timestamp not null,
    constraint fk_discover_posts_author foreign key (author_user_id) references users (id),
    constraint fk_discover_posts_recipe foreign key (recipe_id) references recipes (id)
);
create index idx_discover_posts_author on discover_posts (author_user_id);
create index idx_discover_posts_created on discover_posts (created_at);

create table post_likes (
    user_id uuid not null,
    post_id uuid not null,
    created_at timestamp not null,
    primary key (user_id, post_id),
    constraint fk_post_likes_user foreign key (user_id) references users (id),
    constraint fk_post_likes_post foreign key (post_id) references discover_posts (id)
);

create table post_bookmarks (
    user_id uuid not null,
    post_id uuid not null,
    created_at timestamp not null,
    primary key (user_id, post_id),
    constraint fk_post_bookmarks_user foreign key (user_id) references users (id),
    constraint fk_post_bookmarks_post foreign key (post_id) references discover_posts (id)
);

create table post_comments (
    id uuid primary key default gen_random_uuid(),
    post_id uuid not null,
    user_id uuid not null,
    content text not null,
    created_at timestamp not null,
    constraint fk_post_comments_post foreign key (post_id) references discover_posts (id),
    constraint fk_post_comments_user foreign key (user_id) references users (id)
);
create index idx_post_comments_post on post_comments (post_id);

create table user_follows (
    follower_id uuid not null,
    followed_id uuid not null,
    created_at timestamp not null,
    primary key (follower_id, followed_id),
    constraint fk_user_follows_follower foreign key (follower_id) references users (id),
    constraint fk_user_follows_followed foreign key (followed_id) references users (id)
);
create index idx_user_follows_follower on user_follows (follower_id);
create index idx_user_follows_followed on user_follows (followed_id);
