--liquibase formatted sql

--changeset EBokov:30-01-insert-init-values

insert into regions(name) values ('Нижегородский район');
insert into regions(name) values ('Советский район');
insert into regions(name) values ('Автозаводский район');
insert into regions(name) values ('Московский район');
insert into regions(name) values ('Канавинский район');
insert into regions(name) values ('Сормовский район');

insert into achievements(id, name, description, goal) values (1, 'Первопроходец', 'Завершить 1 маршрут', 0);
insert into achievements(id, name, description, goal) values (2, 'Город под подошвой', 'Завершить 20 маршрутов', 0);
insert into achievements(id, name, description, goal) values (3, 'Машина', 'Пройти 15 км за день', 0);
insert into achievements(id, name, description, goal) values (4, 'Марафонец', 'Пройти 42 км за все время', 0);
insert into achievements(id, name, description, goal) values (5, 'Я - скорость', 'Побить личный рекорд маршрута', 0);
insert into achievements(id, name, description, goal) values (6, 'Спидранер', 'Пройти 3 маршрута за день', 0);

insert into user_activity(name) values ('Школьник');
insert into user_activity(name) values ('В полном расцвете сил');
insert into user_activity(name) values ('Пенсионер');

insert into user_avatars(id, path) values (1, '/avatarProfile/avatar1.png');
insert into user_avatars(id, path) values (2, '/avatarProfile/avatar2.png');
insert into user_avatars(id, path) values (3, '/avatarProfile/avatar3.png');
insert into user_avatars(id, path) values (4, '/avatarProfile/avatar4.png');
insert into user_avatars(id, path) values (5, '/avatarProfile/avatar5.png');
insert into user_avatars(id, path) values (6, '/avatarProfile/avatar6.png');
insert into user_avatars(id, path) values (7, '/avatarProfile/avatar7.png');
insert into user_avatars(id, path) values (8, '/avatarProfile/avatar8.png');

insert into
    users(
        username,
        email,
        gender,
        region_id,
        birthday,
        activity_id,
        avatar_id,
        password,
        role,
        created_at
)
values (
        'User',
        'user@mail.ru',
        'MALE',
        1,
        '11-11-1990',
        1,
        1,
        '$2a$12$l4XNiFWEdstG4CE1L3jvEe2nYeaKwNb0PnuBzcHuFfdquNUXyx/qG',
        'USER',
        CURRENT_TIMESTAMP
);

insert into
    users(
        username,
        email,
        gender,
        region_id,
        birthday,
        activity_id,
        avatar_id,
        password,
        role,
        created_at
)
values (
        'Admin',
        'admin@mail.ru',
        'MALE',
        1,
        '11-11-1990',
        1,
        1,
        '$2a$12$l4XNiFWEdstG4CE1L3jvEe2nYeaKwNb0PnuBzcHuFfdquNUXyx/qG',
        'ADMIN',
        CURRENT_TIMESTAMP
);

insert into categories(name) values ('Прогулка');
insert into categories(name) values ('Пробежка');
insert into categories(name) values ('Велосипед');
insert into categories(name) values ('Самокат');
insert into categories(name) values ('Ролики');
insert into categories(name) values ('С питомцем');
insert into categories(name) values ('Утренняя прогулка');
insert into categories(name) values ('Вечерний маршрут');
insert into categories(name) values ('Ночной маршрут');
insert into categories(name) values ('По заповеднику');
insert into categories(name) values ('По набережной');
insert into categories(name) values ('По стрит-арту');
insert into categories(name) values ('По достопримечательностям');

insert into routes(name, difficulty, distance, duration, likes, created_at, description, image_path)
    values ('Изумрудное прямой', 'EASY', 352, 5, 10, CURRENT_TIMESTAMP, 'test1', '/routes/default.jpg');
insert into routes(name, difficulty, distance, duration, likes, created_at, description, image_path)
    values ('Иземрудное короткий', 'EASY', 277, 5, 10, CURRENT_TIMESTAMP, 'test2', '/routes/default.jpg');
insert into routes(name, difficulty, distance, duration, likes, created_at, description, image_path)
    values ('Изумрудное с поворотами', 'EASY', 371, 5, 10, CURRENT_TIMESTAMP, 'test3', '/routes/default.jpg');

insert into route_categories (route_id, category_id) values (1, 1);
insert into route_categories (route_id, category_id) values (1, 2);
insert into route_categories (route_id, category_id) values (1, 3);
insert into route_categories (route_id, category_id) values (2, 4);
insert into route_categories (route_id, category_id) values (2, 5);
insert into route_categories (route_id, category_id) values (2, 6);
insert into route_categories (route_id, category_id) values (3, 7);
insert into route_categories (route_id, category_id) values (3, 8);
insert into route_categories (route_id, category_id) values (3, 9);

insert into checkpoints(route_id, index, latitude, longitude)
    values (1, 0, 56.804317474365234, 43.34415817260742);
insert into checkpoints(route_id, index, latitude, longitude)
    values (1, 1, 56.80705261230469, 43.34344482421875);

insert into checkpoints(route_id, index, latitude, longitude)
    values (2, 0, 56.8043327331543, 43.3441162109375);
insert into checkpoints(route_id, index, latitude, longitude)
    values (2, 1, 56.804691314697266, 43.34492874145508);
insert into checkpoints(route_id, index, latitude, longitude)
    values (2, 2, 56.804691314697266, 43.34492874145508);

insert into checkpoints(route_id, index, latitude, longitude)
    values (3, 0, 56.804691314697266, 43.34489059448242);
insert into checkpoints(route_id, index, latitude, longitude)
    values (3, 1, 56.803646087646484, 43.34492874145508);
insert into checkpoints(route_id, index, latitude, longitude)
    values (3, 2, 56.80421447753906, 43.347389221191406);
insert into checkpoints(route_id, index, latitude, longitude)
    values (3, 2, 56.80527877807617, 43.34663391113281);