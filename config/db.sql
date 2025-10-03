


create table users(
    id varchar primary key,
    first_name varchar not null,
    email varchar unique,
    last_name varchar not null,
    password varchar(30),
    phone_number varchar,
    address varchar
);
create table posts(
    id varchar primary key,
    title varchar not null,
    content text not null,
    slug varchar unique not null,
    user_id varchar references users(id) on delete cascade
);
create table comment_1 (
    id VARCHAR primary key,
    content text not null,
    post_id varchar,
    user_id varchar ,
    created_at timestamp default current_timestamp,
    constraint fk_post FOREIGN key(post_id) references posts(id) on delete cascade,
    constraint fk_user foreign key(user_id) REFERENCES users(id) on delete cascade
) ;
    


