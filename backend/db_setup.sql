CREATE TABLE IF NOT EXISTS users
(
    "id" Serial PRIMARY KEY,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "email" VARCHAR(200),
    "password" VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS champion_info(
    "key" integer primary key,
    "magick" integer,
    "difficulty" integer,
    "defense" integer,
    "attack" integer
);
CREATE TABLE IF NOT EXISTS champion_tags(
    "value" VARCHAR(50) primary key
);
CREATE TABLE IF NOT EXISTS champion_image_info(
    "key" integer primary key,
    "full" VARCHAR(100),
    "sprite" varchar(100),
    "group" varchar(100),
    "x" integer,
    "y" integer,
    "w" integer,
    "h" integer
);
CREATE TABLE IF NOT EXISTS champion_stats(
    "key" integer primary key,
    hp integer,
    hpperlevel integer,
    mp integer,
    mpperlevel integer,
    movespeed integer,
    armor integer,
    armorperlevel float,
    spellblock integer,
    spellblockperlevel float,
    attackrange integer,
    hpregen float,
    hpregenperlevel float,
    mpregen integer,
    mpregenperlevel float,
    crit integer,
    critperlevel float,
    attackdamage integer,
    attackdamageperlevel float,
    attackspeedperlevel float,
    attackspeed float
);
CREATE TABLE IF NOT EXISTS champion(
    "version" VARCHAR(100),
    "id" varchar(100),
    "key" integer primary key,
    "name" varchar(100),
    "title" varchar(300),
    "blurb" text,
    "info" integer references champion_info(key),
    "image" integer references champion_image_info(key),
    "parttype" varchar(100),
    "stats" integer references champion_stats(key)
);

CREATE TABLE IF NOT EXISTS champion_champion_tags(
    "tag" varchar(50) references champion_tags(value),
    "champion" integer references champion(key)
);

