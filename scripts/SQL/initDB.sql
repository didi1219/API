DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
                          id integer primary key GENERATED ALWAYS AS IDENTITY,
                          title varchar(250) NOT NULL
);

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location (
                          id integer primary key GENERATED ALWAYS AS IDENTITY,
                          label varchar(250) NOT NULL,
                          postalCode int NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
                       id integer primary key GENERATED ALWAYS AS IDENTITY,
                       email varchar(250) UNIQUE NOT NULL,
                       password varchar(250) NOT NULL,
                       last_name varchar(250) NOT NULL,
                       first_name varchar(250) NOT NULL,
                       user_name varchar(250) UNIQUE NOT NULL,
                       bio varchar(500),
                       isAdmin BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
                       id integer primary key GENERATED ALWAYS AS IDENTITY,
                       title varchar(250) NOT NULL,
                       description varchar(250) NOT NULL,
                       event_date DATE NOT NULL,
                       street_number varchar(250) NOT NULL,
                       isPrivate BOOLEAN NOT NULL,
                       picture_path varchar(250),
                       duration int NOT NULL,
                       user_id integer REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
                       location_id integer REFERENCES location(id) DEFERRABLE INITIALLY IMMEDIATE,
                       category_id integer REFERENCES category(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS notification CASCADE;

CREATE TABLE notification (
                              id integer primary key GENERATED ALWAYS AS IDENTITY,
                              title varchar(250) NOT NULL,
                              content varchar(250) NOT NULL,
                              event_id integer REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE NOT NULL,
                              creation_date DATE NOT NULL,
                              type varchar(250)
);

DROP TABLE IF EXISTS discussionEvent CASCADE;

CREATE TABLE discussionEvent (
                                 id integer primary key GENERATED ALWAYS AS IDENTITY,
                                 title varchar(250) NOT NULL,
                                 isWritable BOOLEAN NOT NULL,
                                 event_id integer REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS message CASCADE;

CREATE TABLE message(
                        id integer primary key GENERATED ALWAYS AS IDENTITY,
                        content varchar(250) NOT NULL,
                        sending_date DATE NOT NULL,
                        user_id integer REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
                        discussion_event_id INTEGER REFERENCES discussionEvent(id) DEFERRABLE INITIALLY IMMEDIATE
);

DROP TABLE IF EXISTS linkUserEvent CASCADE;

CREATE TABLE linkUserEvent (
                               user_id INTEGER REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
                               event_id INTEGER REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
                               isWaiting BOOLEAN NOT NULL,
                               isAccepted BOOLEAN NOT NULL,
                               CONSTRAINT unique_user_event UNIQUE (user_id, event_id)
);

-- Fill `category` table
INSERT INTO category (title) VALUES
                                 ('Musique'),
                                 ('Sport'),
                                 ('Art et Expositions'),
                                 ('Théâtre et Comédie'),
                                 ('Festivals'),
                                 ('Conférences'),
                                 ('Formations'),
                                 ('Marchés et Foires'),
                                 ('Soirée'),
                                 ('Discothèques'),
                                 ('Rencontres et Réseautage');

-- Fill `location` table
INSERT INTO location (label, postalCode) VALUES
                                             ('Namur', 5000),
                                             ('Charleroi', 6000),
                                             ('Liège', 4000),
                                             ('Mons', 7000),
                                             ('Arlon', 6700),
                                             ('Tournai', 7500),
                                             ('Wavre', 1300),
                                             ('Dinant', 5500);


-- Fill `users` table
INSERT INTO users (email, password, last_name, first_name, user_name, bio, isAdmin) VALUES
                                                                                        ('johndoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$oeWGTzbMpqd3J7IT1CHv1w$eOBf53KoHNm4V6OOH+uFtc+0HuBNlDqGdmGj1FuXtVs', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels', true),
                                                                                        ('janedoe@example.com', 'password456', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air', false);

-- Fill `event` table
INSERT INTO event (title, description, event_date, street_number, isPrivate, picture_path, duration, user_id, location_id, category_id) VALUES
                                                                                                                                            ('Concert de Jazz', 'Un concert de jazz en plein air.', '2024-12-01', 'Rue Martin Jean', false, 'images/event1.jpg', 120, 1, 1, 1),
                                                                                                                                            ('Conférence Tech', 'Une conférence sur les dernières technologies.', '2024-11-15', 'Rue de la soie', false, 'images/event2.jpg', 70, 2, 2, 2),
                                                                                                                                            ('Marathon', 'Un marathon annuel pour les amateurs de course.', '2024-11-20', 'Boulvard Mélon', false, 'images/event3.jpg', 130, 1, 3, 3),
                                                                                                                                            ('Soirée Disco', 'Soirée en boite avec les potes !', '2024-12-24', 'Discothèque de Namur', true, 'images/event4.jpg', 300, 1, 3, 10),
                                                                                                                                            ('Exposition d art moderne', 'Une exposition unique mettant en vedette des artistes contemporains.', '2024-12-10', 'Galerie Lumière', false, 'images/event5.jpg', 180, 1, 1, 3),
                                                                                                                                            ('Tournoi de Tennis', 'Participez à notre tournoi annuel de tennis.', '2024-12-15', 'Complexe Sportif', false, 'images/event6.jpg', 240, 1, 2, 2),
                                                                                                                                            ('Atelier de Peinture', 'Un atelier pour les amateurs d art.', '2024-12-20', 'Atelier Rue de l Artiste', true, 'images/event7.jpg', 150, 1, 1, 3),
                                                                                                                                            ('Marché de Noël', 'Découvrez des produits artisanaux pour les fêtes.', '2024-12-18', 'Place Centrale', false, 'images/event8.jpg', 300, 1, 3, 8),
                                                                                                                                            ('Soirée Karaoké', 'Une soirée pleine de fun pour les amateurs de chant.', '2024-12-22', 'Café du Centre', true, 'images/event9.jpg', 200, 1, 3, 9);

-- Fill `notification` table
INSERT INTO notification (title, content, event_id, creation_date, type) VALUES
                                                                             ('Rappel événement', 'Le concert de jazz commence bientôt.', 1, '2024-11-30', 'reminder'),
                                                                             ('Invitation', 'Rejoignez la conférence tech.', 2, '2024-11-10', 'invitation');

-- Fill `discussionEvent` table
INSERT INTO discussionEvent (title, isWritable, event_id) VALUES
                                                              ('Discussion Concert de Jazz', true, 1),
                                                              ('Discussion Générale', true, 1),
                                                              ('Discussion Conférence Tech', true, 2);

-- Fill `message` table
INSERT INTO message (content, sending_date, user_id, discussion_event_id) VALUES
                                                                                   ('Vivement le concert !', '2024-11-30', 1, 1),
                                                                                   ('Hâte d en apprendre plus sur les nouvelles technologies.', '2024-11-30', 2, 2);

-- Fill `linkUserEvent`
INSERT INTO linkUserEvent (user_id, event_id, isWaiting, isAccepted) VALUES
                                                                         (1, 1, false, true),
                                                                         (2, 2, false, true),
                                                                         (1, 3, true, false);
