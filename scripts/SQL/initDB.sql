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
                        type integer,
                        sending_date TIMESTAMP NOT NULL,
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
                                 ('Conférence'),
                                 ('Sport'),
                                 ('Art'),
                                 ('Cinéma'),
                                 ('Littérature'),
                                 ('Technologie'),
                                 ('Jeux Vidéo'),
                                 ('Gastronomie'),
                                 ('Voyages'),
                                 ('Mode'),
                                 ('Éducation'),
                                 ('Environnement');

-- Fill `location` table
INSERT INTO users (email, password, last_name, first_name, user_name, bio, isAdmin) VALUES
                                                                                        ('johndoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$oeWGTzbMpqd3J7IT1CHv1w$eOBf53KoHNm4V6OOH+uFtc+0HuBNlDqGdmGj1FuXtVs', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels', true),
                                                                                        ('janedoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$oeWGTzbMpqd3J7IT1CHv1w$eOBf53KoHNm4V6OOH+uFtc+0HuBNlDqGdmGj1FuXtVs', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air', false);

-- Fill `users` table
INSERT INTO location (label, postalCode) VALUES
                                             ('Namur', 5000),
                                             ('Lyon', 4030),
                                             ('Marseille', 2740);

-- Fill `users` table
INSERT INTO users (email, password, last_name, first_name, user_name, bio, isAdmin) VALUES
                                                                                        ('johndoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$oeWGTzbMpqd3J7IT1CHv1w$eOBf53KoHNm4V6OOH+uFtc+0HuBNlDqGdmGj1FuXtVs', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels', true),
                                                                                        ('janedoe@example.com', 'password456', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air', false),
                                                                                        ('user1@example.com', 'password1', 'Smith', 'John', 'johnsmith', 'Loves coding and coffee.', FALSE),
                                                                                        ('user3@example.com', 'password3', 'Brown', 'Charlie', 'charlieb', 'Avid reader and traveler.', FALSE),
                                                                                        ('user4@example.com', 'password4', 'Wilson', 'Emily', 'emilyw', 'Fitness enthusiast.', FALSE),
                                                                                        ('user5@example.com', 'password5', 'Taylor', 'Michael', 'miketaylor', 'Tech geek.', FALSE),
                                                                                        ('user6@example.com', 'password6', 'Johnson', 'Sarah', 'sarahj', 'Musician and foodie.', FALSE),
                                                                                        ('user7@example.com', 'password7', 'Lee', 'David', 'davidlee', 'History buff.', FALSE),
                                                                                        ('user8@example.com', 'password8', 'Martinez', 'Laura', 'lauram', 'Nature lover.', FALSE),
                                                                                        ('user9@example.com', 'password9', 'Garcia', 'Sophia', 'sophiag', 'Fashion designer.', FALSE),
                                                                                        ('user10@example.com', 'password10', 'Anderson', 'James', 'jamesa', 'Film fanatic.', FALSE),
                                                                                        ('user11@example.com', 'password11', 'Thomas', 'Olivia', 'oliviat', 'Yoga practitioner.', FALSE),
                                                                                        ('user12@example.com', 'password12', 'Jackson', 'Ethan', 'ethanj', 'Cycling adventurer.', FALSE),
                                                                                        ('user13@example.com', 'password13', 'White', 'Ava', 'avawhite', 'Gamer and streamer.', FALSE),
                                                                                        ('user14@example.com', 'password14', 'Harris', 'Mia', 'miah', 'Writer and poet.', FALSE),
                                                                                        ('user15@example.com', 'password15', 'Clark', 'Lucas', 'lucasc', 'Photographer.', FALSE),
                                                                                        ('user16@example.com', 'password16', 'Rodriguez', 'Ella', 'ellar', 'Social media manager.', FALSE),
                                                                                        ('user17@example.com', 'password17', 'Lewis', 'Mason', 'masonl', 'Football player.', FALSE),
                                                                                        ('user18@example.com', 'password18', 'Walker', 'Isabella', 'isabellaw', 'Chef.', FALSE),
                                                                                        ('user19@example.com', 'password19', 'Hall', 'Alexander', 'alexhall', 'Entrepreneur.', FALSE),
                                                                                        ('user20@example.com', 'password20', 'Allen', 'Chloe', 'chloeallen', 'Animal rights activist.', FALSE),
                                                                                        ('user21@example.com', 'password21', 'Young', 'Liam', 'liamyoung', 'Art curator.', FALSE),
                                                                                        ('user22@example.com', 'password22', 'King', 'Emma', 'emmaking', 'Aspiring astronaut.', FALSE),
                                                                                        ('user23@example.com', 'password23', 'Wright', 'Benjamin', 'benwright', 'Stock market analyst.', FALSE),
                                                                                        ('user24@example.com', 'password24', 'Lopez', 'Emily', 'emilylopez', 'Biologist.', FALSE),
                                                                                        ('user25@example.com', 'password25', 'Hill', 'Noah', 'noahhill', 'Guitarist.', FALSE);

-- Fill `event` table
INSERT INTO event (title, description, event_date, street_number, isPrivate, picture_path, duration, user_id, location_id, category_id) VALUES
                                                                                                                                            ('Concert de Jazz', 'Un concert de jazz en plein air.', '2024-12-01', '12', false, 'images/event1.jpg', 120, 1, 1, 1),
                                                                                                                                            ('Conférence Tech', 'Une conférence sur les dernières technologies.', '2024-11-15', '45', false, 'images/event2.jpg', 70, 2, 2, 2),
                                                                                                                                            ('Marathon', 'Un marathon annuel pour les amateurs de course.', '2024-11-20', '78', false, 'images/event3.jpg', 130, 1, 3, 3);

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
INSERT INTO message (content, type, sending_date, user_id, discussion_event_id) VALUES
                                                                                    ('Vivement le concert !', 0, '2024-11-30', 1, 1),
                                                                                    ('Hâte d en apprendre plus sur les nouvelles technologies.', 0, '2024-11-30', 2, 2);
-- Fill `linkUserEvent` table
INSERT INTO linkUserEvent (user_id, event_id, isWaiting, isAccepted) VALUES
                                                                         (1, 1, false, true),
                                                                         (2, 2, false, true),
                                                                         (1, 3, true, false);
