drop database sls;
create database sls;
use sls;

create table champion_champion_tags
(
    tag      varchar(50) null,
    champion int         null
);

create table champion_image_info
(
    `key`        int          not null
        primary key,
    full         varchar(100) null,
    sprite       varchar(100) null,
    `group`      varchar(100) null,
    x            int          null,
    y            int          null,
    w            int          null,
    h            int          null,
    overview_key bigint       null
);

create table champion_info
(
    `key`        int    not null
        primary key,
    magick       int    null,
    difficulty   int    null,
    defense      int    null,
    attack       int    null,
    magic        int    not null,
    overview_key bigint null
);

create table champion_overview
(
    version            varchar(100) null,
    id                 varchar(100) null,
    `key`              int          not null
        primary key,
    name               varchar(100) null,
    title              varchar(300) null,
    blurb              text         null,
    info               int          null,
    image              int          null,
    parttype           varchar(100) null,
    stats              int          null,
    imageData          varchar(300) null,
    thumbnailImageData varchar(300) null,
    imageurl           varchar(255) null,
    partype            varchar(255) null,
    thumbnail_url      varchar(255) null,
    image_key          bigint       null,
    info_key           bigint       null,
    stats_key          bigint       null
);

create table champion_rotation
(
    id bigint not null
        primary key
);

create table champion_rotation_champions
(
    champion_rotation_id bigint not null,
    champions_key        bigint not null,
    constraint FKda3iyi1swefam6bkda3ijit2t
        foreign key (champion_rotation_id) references champion_rotation (id)
);

create table champion_rotation_seq
(
    next_val bigint null
);

create table champion_statblock
(
    `key`                int    not null
        primary key,
    hp                   int    null,
    hpperlevel           int    null,
    mp                   int    null,
    mpperlevel           int    null,
    movespeed            int    null,
    armor                int    null,
    armorperlevel        float  null,
    spellblock           int    null,
    spellblockperlevel   float  null,
    attackrange          int    null,
    hpregen              float  null,
    hpregenperlevel      float  null,
    mpregen              int    null,
    mpregenperlevel      float  null,
    crit                 int    null,
    critperlevel         float  null,
    attackdamage         int    null,
    attackdamageperlevel float  null,
    attackspeedperlevel  float  null,
    attackspeed          float  null,
    overview_key         bigint null
);

create table champion_tag
(
    value varchar(255) not null
        primary key
);

create table champion_overview_tags
(
    champion_overview_key bigint       not null,
    tags_value            varchar(255) not null,
    primary key (champion_overview_key, tags_value),
    constraint FKhhfg7curxeeq7lcm12le886ti
        foreign key (tags_value) references champion_tag (value)
);

create table champion_tag_champions
(
    champion_tag_value varchar(255) not null,
    champions_key      bigint       not null,
    primary key (champion_tag_value, champions_key),
    constraint FKa2e3bwkxsr84sch1eqoi5obaa
        foreign key (champion_tag_value) references champion_tag (value)
);

create table champion_tags
(
    value varchar(50) not null
        primary key
);



insert into champion_tag (value) values
                                        ('Fighter'),
                                        ('Tank'),
                                        ('Mage'),
                                        ('Assassin'),
                                        ('Marksman'),
                                        ('Support')

