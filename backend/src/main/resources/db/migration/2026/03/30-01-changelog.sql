--liquibase formatted sql

--changeset EBokov:30-01-init

create extension if not exists pgcrypto;

create table images (
    id              uuid primary key default gen_random_uuid(),
    display_order   integer not null,
    path            text    not null
);

create table images_to_clean (
    id          bigserial,
    image_id    uuid,
    primary key (id, image_id),
    foreign key (image_id)
        references images(id)
        on delete cascade
);

create table regions (
    id          bigserial primary key,
    name        varchar
);

create table categories (
    id      bigserial primary key,
    name    varchar
);

create table routes (
    id          bigserial primary key,
    name        varchar,
    description text,
    image_path text,
    difficulty  varchar,
    distance    bigint,
    duration    bigint,
    likes       bigint,
    created_at  timestamp with time zone
);

create table checkpoints (
    id          bigserial primary key,
    route_id    bigserial,
    index       int,
    longitude   float,
    latitude    float,
    foreign key (route_id) references routes(id)
);

create table route_images (
    image_id    uuid,
    route_id    bigserial,
    primary key (image_id, route_id),
    foreign key (image_id) references images(id),
    foreign key (route_id) references routes(id)
);

create table route_categories (
    route_id    bigserial,
    category_id bigserial,
    primary key (route_id, category_id),
    foreign key (route_id) references routes(id),
    foreign key (category_id) references categories(id)
);

create table achievements (
    id          bigserial primary key,
    name        varchar,
    description text,
    goal        bigint
);

create table achievement_images (
    image_id            uuid,
    achievement_id      bigserial,
    primary key (image_id, achievement_id),
    foreign key (image_id) references images(id),
    foreign key (achievement_id) references achievements(id)
);

create table user_avatars (
    id          bigserial primary key,
    path        text
);

create table user_activity (
    id          bigserial primary key,
    name        varchar
);

create table users (
    id          bigserial primary key,
    username    varchar,
    email       varchar,
    avatar_id   bigserial,
    region_id   bigint,
    activity_id bigint,
    gender      varchar,
    birthday    date,
    password    varchar,
    role        varchar,
    created_at  timestamp with time zone,
    foreign key (avatar_id) references user_avatars(id)
);

create table user_preferences (
    user_id     bigserial,
    category_id bigserial,
    primary key (user_id, category_id),
    foreign key (user_id) references users(id),
    foreign key (category_id) references categories(id)
);


create table user_achieved_achievements (
    user_id         bigserial,
    achievement_id  bigserial,
    achieved_at     timestamp with time zone,
    primary key (user_id, achievement_id),
    foreign key (user_id) references users(id),
    foreign key (achievement_id) references achievements(id)
);

create table user_favourite_routes (
    user_id     bigserial,
    route_id    bigserial,
    primary key (user_id, route_id),
    foreign key (user_id) references users(id),
    foreign key (route_id) references routes(id)
);

create table user_routes_history (
    id          bigserial,
    user_id     bigserial,
    route_id    bigserial,
    status      varchar,
    started_at  timestamp with time zone,
    finished_at timestamp with time zone,
    delta       varchar,
    primary key (id),
    foreign key (user_id) references users(id),
    foreign key (route_id) references routes(id)
);