DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar
);

--INSERT INTO category (title)
--VALUES('Festival'),('Music'),('Food'),('Sport'),('Culture');

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    label varchar
);

--INSERT INTO location (label)
--VALUES ('Namur'),('Liège'),('Bruxelles'),('Charlesroi');

DROP TABLE IF EXISTS users CASCADE;

-- estAdmin a ajouter
CREATE TABLE users (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    email varchar UNIQUE,
    password varchar,
    last_name varchar,
    first_name varchar,
    user_name varchar,
    bio varchar
);

--INSERT INTO owner (email,password,last_name,first_name,user_name,bio)
--VALUES ('valentin.guillaume@live.be','1234','Guillaume','Valentin','Bamcko','coucou');

DROP TABLE IF EXISTS event CASCADE;


CREATE TABLE event (
    id integer primary key GENERATED ALWAYS AS IDENTITY,
    title varchar,
    description varchar,
    event_date TIMESTAMP,
    street_number varchar,
    user_id integer REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
    location_id integer REFERENCES location(id) DEFERRABLE INITIALLY IMMEDIATE,
    category_id integer REFERENCES category(id) DEFERRABLE INITIALLY IMMEDIATE
);

--INSERT INTO event (title,description,event_date,street_number,user_id,location_id,category_id)
--VALUES ('IESN Party','Blablabla','2024-11-30 20:00:00','Rue de fer, 43',1,1,1);

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
    user_id integer REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
    discussion_Event_id INTEGER REFERENCES discussionEvent(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS linkUserEvent CASCADE;

CREATE TABLE linkUserEvent (
    user_id INTEGER REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
    event_id INTEGER REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
    is_waiting BOOLEAN,
    is_accepted BOOLEAN,
    CONSTRAINT unique_user_event UNIQUE (user_id, event_id)
);


-- Remplir la table `category`
INSERT INTO category (title) VALUES
                                 ('Musique'),
                                 ('Conférence'),
                                 ('Sport');

-- Remplir la table `location`
INSERT INTO location (label) VALUES
                                 ('Paris'),
                                 ('Lyon'),
                                 ('Marseille');

-- Remplir la table `owner`
INSERT INTO users (email, password, last_name, first_name, user_name, bio) VALUES
                                                                               ('johndoe@example.com', 'password123', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels'),
                                                                               ('janedoe@example.com', 'password456', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air');

-- Remplir la table event
INSERT INTO event (title, description, event_date, street_number, user_id, location_id, category_id) VALUES
                                                                                                          ('Concert de Jazz', 'Un concert de jazz en plein air.', '2024-12-01 20:00:00', '12', 1, 1, 1),
                                                                                                          ('Conférence Tech', 'Une conférence sur les dernières technologies.', '2024-11-15 09:00:00', '45', 2, 2, 2),
                                                                                                          ('Marathon', 'Un marathon annuel pour les amateurs de course.', '2024-11-20 08:00:00', '78', 1, 3, 3);

-- Remplir la table `notification`
INSERT INTO notification (title, content, event_id, creation_date, type) VALUES
                                                                             ('Rappel événement', 'Le concert de jazz commence bientôt.', 1, '2024-11-30 10:00:00', 'reminder'),
                                                                             ('Invitation', 'Rejoignez la conférence tech.', 2, '2024-11-10 15:00:00', 'invitation');

-- Remplir la table `discussionEvent`
INSERT INTO discussionEvent (title, event_id) VALUES
                                                  ('Discussion Concert de Jazz', 1),
                                                  ('Discussion Conférence Tech', 2);

-- Remplir la table `message`
INSERT INTO message (content, gps, type, user_id, discussion_Event_id) VALUES
                                                                           ('Vivement le concert !', 123456, 'text', 1, 1),
                                                                           ('Hâte d en apprendre plus sur les nouvelles technologies.', 654321, 'text', 2, 2);

-- Remplir la table `linkUserEvent`
INSERT INTO linkUserEvent (user_id, event_id, is_waiting, is_accepted) VALUES
                                                                           (1, 1, false, true),
                                                                           (2, 2, false, true),
                                                                           (1, 3, true, false);
