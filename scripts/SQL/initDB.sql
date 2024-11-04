DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar
);