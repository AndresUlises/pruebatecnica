
drop table if exists contact_messages CASCADE;
drop table if exists contact CASCADE;
drop table if exists messages CASCADE;
drop table if exists users CASCADE;

create table `contact` (
        `id` bigint generated by default as identity,
        `email` varchar(255) not null,
        `name` varchar(255) not null,
        `user_id` bigint,
        primary key (`id`)
    );

create table `contact_messages` (
        `contacts_id` bigint not null,
        `messages_id` bigint not null,
        primary key (`contacts_id`, `messages_id`)
    );

create table `messages` (
        `id` bigint generated by default as identity,
        `content` varchar(255) not null,
        `user_id` bigint,
        primary key (`id`)
    );

create table `users` (
        `id` bigint generated by default as identity,
        `full_name` varchar(255) not null,
        `password` varchar(255) not null,
        `temporal_code` binary,
        `username` varchar(255) not null,
        primary key (`id`)
    );