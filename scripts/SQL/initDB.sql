DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar
);

INSERT INTO category (title)
VALUES('Festival'),('Music'),('Food'),('Sport'),('Culture');

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    label varchar
);

INSERT INTO location (label)
VALUES ('Namur'),('Liège'),('Bruxelles'),('Charlesroi');

DROP TABLE IF EXISTS owner CASCADE;

CREATE TABLE owner (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    email varchar UNIQUE,
    password varchar,
    last_name varchar,
    first_name varchar,
    user_name varchar,
    bio varchar
);

INSERT INTO owner (email,password,last_name,first_name,user_name,bio)
VALUES ('valentin.guillaume@live.be','1234','Guillaume','Valentin','Bamcko','coucou');

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar,
    description varchar,
    event_date TIMESTAMP,
    street_number varchar,
    owner_id integer REFERENCES owner(id) DEFERRABLE INITIALLY IMMEDIATE,
    location_id integer REFERENCES location(id) DEFERRABLE INITIALLY IMMEDIATE,
    category_id integer REFERENCES category(id) DEFERRABLE INITIALLY IMMEDIATE
);

INSERT INTO event (title,description,event_date,street_number,owner_id,location_id,category_id)
VALUES ('IESN Party','Blablabla','2024-11-30 20:00:00','Rue de fer, 43',1,1,1);

DROP TABLE IF EXISTS notification CASCADE;

CREATE TABLE notification (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar,
    content varchar,
    event_id integer REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
    creation_date TIMESTAMP,
    type varchar
);

DROP TABLE IF EXISTS discussionEvent CASCADE;

CREATE TABLE discussionEvent (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar,
    event_id integer REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS message CASCADE;

CREATE TABLE message(
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    content varchar,
    gps integer,
    type varchar,
    user_id integer REFERENCES owner(id) DEFERRABLE INITIALLY IMMEDIATE,
    discussion_Event_id INTEGER REFERENCES discussionEvent(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS linkUserEvent CASCADE;

CREATE TABLE linkUserEvent (
    user_id INTEGER REFERENCES owner(id) DEFERRABLE INITIALLY IMMEDIATE,
    event_id INTEGER REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
    is_waiting BOOLEAN,
    is_accepted BOOLEAN
);