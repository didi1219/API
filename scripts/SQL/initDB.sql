DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
                          id integer primary key GENERATED ALWAYS AS IDENTITY,
                          icon_component_name varchar(250) NOT NULL,
                          icon_name varchar(250) NOT NULL,
                          title varchar(250) NOT NULL
);

DROP TABLE IF EXISTS location CASCADE;

CREATE TABLE location (
                          id integer primary key GENERATED ALWAYS AS IDENTITY,
                          label varchar(250) NOT NULL,
                          postal_code int NOT NULL
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
                       picture_path varchar(500) NOT NULL,
                       isAdmin BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
                       id integer primary key GENERATED ALWAYS AS IDENTITY,
                       title varchar(250) NOT NULL,
                       description varchar(250) ,
                       event_start TIMESTAMP NOT NULL,
                       event_end TIMESTAMP NOT NULL,
                       street_number varchar(250) NOT NULL,
                       is_private BOOLEAN NOT NULL,
                       picture_path varchar(250),
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
                                 is_writable BOOLEAN NOT NULL,
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
                               id integer primary key GENERATED ALWAYS AS IDENTITY,
                               user_id INTEGER REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
                               event_id INTEGER REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
                               is_waiting BOOLEAN NOT NULL,
                               is_accepted BOOLEAN NOT NULL,
                               is_favorite BOOLEAN NOT NULL,
                               CONSTRAINT unique_user_event UNIQUE (user_id, event_id)
);

-- Fill `category` table
INSERT INTO category (title,icon_component_name,icon_name) VALUES
                                 ('Music','Feather','music'),
                                 ('Festival','MaterialIcons','festival'),
                                 ('Conference','Octicons','comment-discussion'),
                                 ('Party','MaterialCommunityIcons','party-popper'),
                                 ('Sport','MaterialIcons','sports-soccer'),
                                 ('Art','Octicons','paintbrush'),
                                 ('Cinema','FontAwesome6','video'),
                                 ('Literature','AntDesign','book'),
                                 ('Technology','MaterialIcons','computer'),
                                 ('Video Games','MaterialIcons','games'),
                                 ('Food','MaterialIcons','fastfood'),
                                 ('Education','MaterialCommunityIcons','book-education'),
                                 ('Environment','FontAwesome','tree');


-- Fill `users` table
-- Fill `location` table (Not `users` table)
INSERT INTO location (label, postal_code) VALUES
                                              ('Namur', 5000),
                                              ('Charleroi', 6000),
                                              ('Liège', 4000),
                                              ('Mons', 7000),
                                              ('Arlon', 6700),
                                              ('Tournai', 7500),
                                              ('Wavre', 1300),
                                              ('Dinant', 5500);



-- Fill `users` table
INSERT INTO users (email, password, last_name, first_name, user_name, bio,picture_path, isAdmin) VALUES
                                                                                        ('johndoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$isk72/8tURlM9EyCAc5jmg$DqeYVFmQaw/6LWmzoSjzV/P7/JXE5CVdMzROeTqnmOM', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels','event1.jpeg', true),
                                                                                        ('janedoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$UtvC3J3psqfNJ3SnZAfndA$ILwMECPq8d3GpxpguFeSZoY8oD79pClJ+/+niEqYpHc', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air','event1.jpeg',false),
                                                                                        ('johnsmith123@example.com', '$argon2id$v=19$m=65536,t=3,p=4$W1xY0Z8gRMeTzW/r2e5Myg$jgRcBVBZBnxxD+teyWan68QC/Kg4/Z0Gd6hWsGYJKnE', 'Smith', 'John', 'johnsmith', 'Loves coding and coffee.','event1.jpeg', FALSE),
                                                                                        ('charliebrown@example.com', '$argon2id$v=19$m=65536,t=3,p=4$jdRARVRU/qVdfDGvRaJBeQ$6JNoqUvQ6uYUw49jCgmbXIO/UD84vGQreW+3HXS7Jcc', 'Brown', 'Charlie', 'charlieb', 'Avid reader and traveler.','event1.jpeg', FALSE),
                                                                                        ('emilywilson@example.com', '$argon2id$v=19$m=65536,t=3,p=4$jZFSPZg0nuTg8T3mHnSHMg$OrdyC0w3olDL+nB7aPkxZ6oJJHAhDftR9QZqa0Is/F4', 'Wilson', 'Emily', 'emilyw', 'Fitness enthusiast.','event1.jpeg', FALSE),
                                                                                        ('miketaylor88@example.com', '$argon2id$v=19$m=65536,t=3,p=4$qAXG700O7qJ5HVxnwUNupw$NGFBRnXMvyAhesU+x74iEci9jZNDjSROkcLoQyXyVF0', 'Taylor', 'Michael', 'miketaylor', 'Tech geek.','event1.jpeg', FALSE),
                                                                                        ('sarahjohnson22@example.com', '$argon2id$v=19$m=65536,t=3,p=4$yByvz2RbvBOqFPkmH45/sQ$m6aKAWOXA8PF8bHxQjh/A64kaYJuyhCIJaqYO7Aa7ks', 'Johnson', 'Sarah', 'sarahj', 'Musician and foodie.','event1.jpeg', FALSE),
                                                                                        ('davidlee1987@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Et5H9Guicphvzl4It3b9tQ$tJsCtoObsTrGBxMNN+wEyyBCjyTj5Q/ejBZQP4lSM30', 'Lee', 'David', 'davidlee', 'History buff.','event1.jpeg', FALSE),
                                                                                        ('lauramartinez@example.com', '$argon2id$v=19$m=65536,t=3,p=4$HUgngl0AIDif0SqE/09Jsg$SsP81VY1BlbzQLobZpdFZb7Tv/PZz7KEGrZwfjNhEYw', 'Martinez', 'Laura', 'lauram', 'Nature lover.','event1.jpeg', FALSE),
                                                                                        ('sophiagarcia@example.com', '$argon2id$v=19$m=65536,t=3,p=4$HCK/wheTmnoI468PHs8yyg$XhAl4skCLslmShhJ/cgqTAXvJM5zie7+/OT0DJs171k', 'Garcia', 'Sophia', 'sophiag', 'Fashion designer.','event1.jpeg', FALSE),
                                                                                        ('jamesanderson@example.com', '$argon2id$v=19$m=65536,t=3,p=4$N51HbVycyy351WnIysNdMw$rtEfTZcAGJcAJmhMJPPbaYvd9h0+kzUqFLI91ruiAjM', 'Anderson', 'James', 'jamesa', 'Film fanatic.','event1.jpeg', FALSE),
                                                                                        ('olivianthomas@example.com', '$argon2id$v=19$m=65536,t=3,p=4$vK+HrNNSYJzQ4G3ljXObdg$LNdNpltmaqrudScUj1qJa9dZY7DcnTHvirRCMzfPpFI', 'Thomas', 'Olivia', 'oliviat', 'Yoga practitioner.','event1.jpeg', FALSE),
                                                                                        ('ethanjackson@example.com', '$argon2id$v=19$m=65536,t=3,p=4$lKegO2nWiRbGw6FDDhINaA$LL7aYUXhkiGLyThTdzWww+kWmO+71oxe17mkorL2uyA', 'Jackson', 'Ethan', 'ethanj', 'Cycling adventurer.','event1.jpeg', FALSE);


INSERT INTO event (title, description, event_start, event_end, street_number, is_private, picture_path, user_id, location_id, category_id)
VALUES
    ('Concert de Jazz', 'Un concert de jazz en plein air.', '2025-05-10 22:00', '2025-05-10 23:59', 'Avenue des Musiciens', false, '88c3437f-4f1c-411d-a17f-3ebe39afd1f4.jpeg', 1, 1, 1),
    ('Gala Bienvenue', 'Une invitation au lancement de la compagnie ! ', '2025-06-10 19:00', '2025-06-15 23:59', 'Rue des Innovations', false, '8095d8cf-b644-4ef8-9b20-f81f83994c6e.jpeg', 2, 2, 4),
    ('Festival Electro', 'Une soirée pleine de fun !', '2025-07-22 21:00', '2025-07-22 23:59', 'Place des Raves', true, '352d37d2-4ce5-4aac-960e-3cd464c32a2c.jpeg', 1, 3, 2),
    ('Marathon', 'Un marathon annuel pour les amateurs de course.', '2025-04-18 08:00', '2025-04-18 15:00', 'Avenue du Sport', false, '0e60132e-53b0-40b1-81cb-fc1abc048b32.jpeg', 1, 3, 5),
    ('Soirée Disco', 'Soirée en boite avec les potes !', '2025-08-01 23:00', '2025-08-01 05:00', 'Le Dancehall', true, 'f6049db1-fbc1-49cf-879e-4ef10e153919.jpeg', 1, 3, 4),
    ('Conférence Technologique', 'Un salon où les entreprises de technologie du monde entier présentent leurs dernières innovations et gadgets.', '2025-01-15 09:00', '2025-01-15 18:00', 'Centre des Expositions', false, '0f43555d-5b88-45c6-b2c0-8f4d660c3678.jpeg', 6, 6, 3),
    ('Sport en club', 'Participez à notre tournoi de sport', '2024-12-15 10:00', '2024-12-15 16:00', 'Complexe Sportif', false, '94eb113a-a90b-4a1a-ae1e-b11f4b6e7f35.jpeg', 7, 7, 5),
    ('Soirée de fin d année', 'Venez vivre la joie de la fin des examens !', '2024-12-20 20:00', '2024-12-20 23:59', 'Rue du ferant 45', true, '270c5ef6-4aad-4bd0-b91a-19d88c60d558.jpeg', 8, 8, 4),
    ('Nouvel An', 'Une soirée parfaite pour le nouvel an !', '2024-12-31 22:00', '2024-12-31 23:59', 'Place du Marché', true, 'f05b87f7-1795-4ba0-84f8-8064f208e725.jpeg', 9, 5, 4),
    ('Buffet de Noel', 'Découvrez des produits artisanaux pour les fêtes dans un buffet à volonté !', '2024-12-25 12:00', '2024-12-25 18:00', 'Place du Théâtre', false, 'e6020ebb-c2d4-4c48-b68e-d6648fc5733b.jpeg', 10, 1, 11);


-- Fill `notification` table
INSERT INTO notification (title, content, event_id, creation_date, type) VALUES
                                                                             ('Rappel événement', 'Le concert de jazz commence bientôt.', 1, '2024-11-30', 'reminder'),
                                                                             ('Invitation', 'Rejoignez la conférence tech.', 2, '2024-11-10', 'invitation'),
                                                                             ('Rappel événement', 'Le Festival Electro débute dans 2 jours !', 3, '2025-07-20', 'reminder'),
                                                                             ('Invitation', 'Rejoignez-nous pour la Soirée Disco.', 5, '2025-07-25', 'invitation'),
                                                                             ('Annonce', 'Le Marathon annuel approche, inscrivez-vous maintenant.', 4, '2025-04-01', 'announcement'),
                                                                             ('Rappel', 'Ne manquez pas la Soirée de fin d’année !', 8, '2024-12-18', 'reminder'),
                                                                             ('Annonce', 'La conférence technologique mettra en avant les innovations IA.', 6, '2024-12-01', 'announcement');

-- Fill `discussionEvent` table
INSERT INTO discussionEvent (title, is_writable, event_id) VALUES
                                                              ('Discussion Concert de Jazz', true, 1),
                                                              ('Discussion Générale', true, 1),
                                                              ('Discussion Conférence Tech', true, 2),
                                                              ('Discussion Festival Electro', true, 3),
                                                              ('Discussion Soirée Disco', true, 5),
                                                              ('Forum Marathon', true, 4),
                                                              ('Discussion Soirée de fin d’année', true, 8),
                                                              ('Espace Échanges Conférence Tech', true, 6),
                                                              ('Annonce',false,1);



-- Fill `message` table
INSERT INTO message (content, type, sending_date, user_id, discussion_event_id) VALUES
                                                                                    ('Vivement le concert !', 0, '2024-11-30 18:30:00', 1, 1),
                                                                                    ('Hâte d en apprendre plus sur les nouvelles technologies.', 0, '2024-11-30 19:00:00', 2, 2),
                                                                                    ('J’ai hâte de danser toute la nuit au Festival Electro !', 0, '2025-07-18 20:00:00', 1, 4),
                                                                                    ('Quelqu’un peut m’expliquer où trouver des places pour le Festival ?', 0, '2025-07-19 09:30:00', 2, 4),
                                                                                    ('Le marathon de cette année promet d’être épique !', 0, '2025-04-10 07:00:00', 3, 5),
                                                                                    ('La Soirée Disco sera incroyable !', 0, '2025-07-20 22:00:00', 4, 6),
                                                                                    ('La conférence abordera-t-elle les dernières avancées en IA ?', 0, '2024-12-05 14:00:00', 5, 7),
                                                                                    ('Vivement le concert de ce soir, je suis trop impatient !', 0, '2024-11-30 17:45:00', 1, 1),
                                                                                    ('Est-ce que quelqu’un a déjà vu ce groupe en live ? Je suis curieux !', 0, '2024-11-30 18:00:00', 2, 1),
                                                                                    ('Quelles chansons du groupe souhaitez-vous entendre pendant le concert ?', 0, '2024-11-30 18:15:00', 3, 1),
                                                                                    ('Si quelqu’un a des bons plans pour les billets, faites-moi signe !', 0, '2024-12-01 12:30:00', 4, 1),
                                                                                    ('La scène va être gigantesque, ça promet !', 0, '2024-12-01 13:00:00', 5, 1),
                                                                                    ('Je suis super excité pour l’avant-concert ! Est-ce qu’on se retrouve tous pour un verre avant ?', 0, '2024-12-01 14:00:00', 6, 1),
                                                                                    ('J’ai entendu dire qu’il y a une surprise spéciale pendant le concert, quelqu’un en sait plus ?', 0, '2024-12-02 11:00:00', 7, 1);

-- Fill `linkUserEvent` table
INSERT INTO linkUserEvent (user_id, event_id, is_waiting, is_accepted,is_favorite) VALUES
                                                                         (1, 1, false, true,true),
                                                                         (2, 2, false, true,false),
                                                                         (1, 3, true, false,false),
                                                                         (2, 3, true, false,false), -- Jane Doe attend une confirmation pour le Festival Electro
                                                                         (3, 4, false, true,false), -- John Smith participe au Marathon
                                                                         (4, 5, false, true,false), -- Charlie Brown participe à la Soirée Disco
                                                                         (5, 6, false, true,false), -- Emily Wilson participe à la Conférence Tech
                                                                         (6, 8, true, false,false), -- Mike Taylor attend une confirmation pour la Soirée de fin d’année
                                                                         (7, 8, false, true,false), -- Sarah Johnson participe à la Soirée de fin d’année
                                                                         (8, 1, true, false,false); -- David Lee attend une confirmation pour le Concert de Jazz
