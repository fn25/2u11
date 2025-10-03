create table tournaments(
    tournament_id serial primary key,
    tournament_name varchar unique not null,
    start_date date not null,
    end_date date not null,
    status varchar(20) not null
);
create table football_clubs(
    club_id serial primary key,
    club_name varchar(100) unique not null,
    city varchar(100),
    country varchar(100),
    founded_year int
);
create table teams(
    team_id serial primary key,
    team_name varchar not null,
    club_id int,
    coach_name varchar(100),
    constraint fk_teams_club foreign key (club_id) references football_clubs(club_id) on delete set null
);
create table tournament_groups(
    group_id serial primary key,
    group_name varchar,
    tournament_id int,
    created_at timestamp default current_timestamp,
    constraint fk_group_tournament foreign key (tournament_id) references tournaments(tournament_id) on delete cascade
);
create table players (
    player_id serial primary key,
    full_name varchar not null,
    date_of_birth date not null,
    position varchar(50),
    team_id int,
    jersey_number int unique,
    constraint fk_players_team foreign key (team_id) references teams(team_id) on delete cascade
);
create table match_fixtures(
    match_id serial primary key,
    match_date timestamp not null,
    venue varchar(100),
    home_team_id int,
    away_team_id int,
    home_score int,
    away_score int,
    match_status varchar(20),
    tournament_id int,
    constraint fk_match_tournament foreign key (tournament_id) references tournaments(tournament_id) on delete cascade,
    constraint fk_match_home_team foreign key (home_team_id) references teams(team_id) on delete cascade,
    constraint fk_match_away_team foreign key (away_team_id) references teams(team_id) on delete cascade
);


