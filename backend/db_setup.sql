CREATE TABLE IF NOT EXISTS stocks
(
    id Serial PRIMARY KEY,
    ticker VARCHAR(50),
    name VARCHAR(200),
    market VARCHAR(200),
    locale VARCHAR(4),
    primary_exchange VARCHAR(20),
    type VARCHAR(50),
    active BOOLEAN,
    currency_name VARCHAR(4),
    cik VARCHAR(50),
    composite_figi VARCHAR(50),
    share_class_figi VARCHAR(50),
    last_updated_utc VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS users
(
    id Serial PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(200),
    password VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS stocks_users
(
    user_id Integer REFERENCES users(id),
    stock_id Integer REFERENCES stocks(id)
);