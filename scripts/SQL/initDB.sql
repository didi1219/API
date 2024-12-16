DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
                          id integer primary key GENERATED ALWAYS AS IDENTITY,
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
                       isAdmin BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS event CASCADE;

CREATE TABLE event (
                       id integer primary key GENERATED ALWAYS AS IDENTITY,
                       title varchar(250) NOT NULL,
                       description varchar(250) NOT NULL,
                       event_date DATE NOT NULL,
                       street_number varchar(250) NOT NULL,
                       is_private BOOLEAN NOT NULL,
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
                               user_id INTEGER REFERENCES users(id) DEFERRABLE INITIALLY IMMEDIATE,
                               event_id INTEGER REFERENCES event(id) DEFERRABLE INITIALLY IMMEDIATE,
                               is_waiting BOOLEAN NOT NULL,
                               is_accepted BOOLEAN NOT NULL,
                               CONSTRAINT unique_user_event UNIQUE (user_id, event_id)
);

-- Fill `category` table
INSERT INTO category (title) VALUES
                                 ('Music'),
                                 ('Festival'),
                                 ('Conference'),
                                 ('Party'),
                                 ('Sport'),
                                 ('Art'),
                                 ('Cinema'),
                                 ('Literature'),
                                 ('Technology'),
                                 ('Video Games'),
                                 ('Food'),
                                 ('Education'),
                                 ('Environment');


-- Fill `users` table
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
INSERT INTO users (email, password, last_name, first_name, user_name, bio, isAdmin) VALUES
                                                                                        ('johndoe@example.com', '$argon2id$v=19$m=65536,t=3,p=4$oeWGTzbMpqd3J7IT1CHv1w$eOBf53KoHNm4V6OOH+uFtc+0HuBNlDqGdmGj1FuXtVs', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels', true),
                                                                                        ('janedoe@example.com', 'password456', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air', false),
                                                                                        ('johnsmith123@example.com', 'password1', 'Smith', 'John', 'johnsmith', 'Loves coding and coffee.', FALSE),
                                                                                        ('charliebrown@example.com', 'password3', 'Brown', 'Charlie', 'charlieb', 'Avid reader and traveler.', FALSE),
                                                                                        ('emilywilson@example.com', 'password4', 'Wilson', 'Emily', 'emilyw', 'Fitness enthusiast.', FALSE),
                                                                                        ('miketaylor88@example.com', 'password5', 'Taylor', 'Michael', 'miketaylor', 'Tech geek.', FALSE),
                                                                                        ('sarahjohnson22@example.com', 'password6', 'Johnson', 'Sarah', 'sarahj', 'Musician and foodie.', FALSE),
                                                                                        ('davidlee1987@example.com', 'password7', 'Lee', 'David', 'davidlee', 'History buff.', FALSE),
                                                                                        ('lauramartinez@example.com', 'password8', 'Martinez', 'Laura', 'lauram', 'Nature lover.', FALSE),
                                                                                        ('sophiagarcia@example.com', 'password9', 'Garcia', 'Sophia', 'sophiag', 'Fashion designer.', FALSE),
                                                                                        ('jamesanderson@example.com', 'password10', 'Anderson', 'James', 'jamesa', 'Film fanatic.', FALSE),
                                                                                        ('olivianthomas@example.com', 'password11', 'Thomas', 'Olivia', 'oliviat', 'Yoga practitioner.', FALSE),
                                                                                        ('ethanjackson@example.com', 'password12', 'Jackson', 'Ethan', 'ethanj', 'Cycling adventurer.', FALSE),
                                                                                        ('avawhite@example.com', 'password13', 'White', 'Ava', 'avawhite', 'Gamer and streamer.', FALSE),
                                                                                        ('miavharris@example.com', 'password14', 'Harris', 'Mia', 'miah', 'Writer and poet.', FALSE),
                                                                                        ('lucasclark@example.com', 'password15', 'Clark', 'Lucas', 'lucasc', 'Photographer.', FALSE),
                                                                                        ('ellarodriguez@example.com', 'password16', 'Rodriguez', 'Ella', 'ellar', 'Social media manager.', FALSE),
                                                                                        ('masonlewis@example.com', 'password17', 'Lewis', 'Mason', 'masonl', 'Football player.', FALSE),
                                                                                        ('isabellawalker@example.com', 'password18', 'Walker', 'Isabella', 'isabellaw', 'Chef.', FALSE),
                                                                                        ('alexhallentrepreneur@example.com', 'password19', 'Hall', 'Alexander', 'alexhall', 'Entrepreneur.', FALSE),
                                                                                        ('chloeallen@example.com', 'password20', 'Allen', 'Chloe', 'chloeallen', 'Animal rights activist.', FALSE),
                                                                                        ('liamyoungart@example.com', 'password21', 'Young', 'Liam', 'liamyoung', 'Art curator.', FALSE),
                                                                                        ('emmakingking@example.com', 'password22', 'King', 'Emma', 'emmaking', 'Aspiring astronaut.', FALSE),
                                                                                        ('benwrightstocks@example.com', 'password23', 'Wright', 'Benjamin', 'benwright', 'Stock market analyst.', FALSE),
                                                                                        ('emilylopezbio@example.com', 'password24', 'Lopez', 'Emily', 'emilylopez', 'Biologist.', FALSE),
                                                                                        ('noahhillguitar@example.com', 'password25', 'Hill', 'Noah', 'noahhill', 'Guitarist.', FALSE);

-- Fill `event` table
INSERT INTO event (title, description, event_date, street_number, is_private, picture_path, duration, user_id, location_id, category_id) VALUES
                                                                                                                                            ('Concert de Jazz', 'Un concert de jazz en plein air.', '2025-05-10', 'Avenue des Musiciens', false, '88c3437f-4f1c-411d-a17f-3ebe39afd1f4.jpeg', 120, 1, 1, 1),
                                                                                                                                            ('Gala Bienvenue', 'Une invitation au lancement de la compagnie ! ', '2025-06-15', 'Rue des Innovations', false, '8095d8cf-b644-4ef8-9b20-f81f83994c6e.jpeg', 70, 2, 2, 4),
                                                                                                                                            ('Festival Electro', 'Une soirée pleine de fun !', '2025-07-22', 'Place des Raves', true, '352d37d2-4ce5-4aac-960e-3cd464c32a2c.jpeg', 200, 1, 3, 2),
                                                                                                                                            ('Marathon', 'Un marathon annuel pour les amateurs de course.', '2025-04-18', 'Avenue du Sport', false, '0e60132e-53b0-40b1-81cb-fc1abc048b32.jpeg', 130, 1, 3, 5),
                                                                                                                                            ('Soirée Disco', 'Soirée en boite avec les potes !', '2025-08-01', 'Le Dancehall', true, 'f6049db1-fbc1-49cf-879e-4ef10e153919.jpeg', 300, 1, 3, 4),
                                                                                                                                            ('Conférence Technologique', 'Un salon où les entreprises de technologie du monde entier présentent leurs dernières innovations et gadgets.', '2025-01-15', 'Centre des Expositions', false, '0f43555d-5b88-45c6-b2c0-8f4d660c3678.jpeg', 300, 6, 6, 3),
                                                                                                                                            ('Sport en club', 'Participez à notre tournoi de sport', '2024-12-15', 'Complexe Sportif', false, '94eb113a-a90b-4a1a-ae1e-b11f4b6e7f35.jpeg', 120, 7, 7, 5),
                                                                                                                                            ('Soirée de fin d année', 'Venez vivre la joie de la fin des examens !', '2024-12-20', 'Rue du ferant 45', true, '270c5ef6-4aad-4bd0-b91a-19d88c60d558.jpeg', 360, 8, 8, 4),
                                                                                                                                            ('Nouvel An', 'Une soirée parfaite pour le nouvel an !', '2024-12-31', 'Place du Marché', true, 'f05b87f7-1795-4ba0-84f8-8064f208e725.jpeg', 240, 9, 5, 2),
                                                                                                                                            ('Buffet de Noel', 'Découvrez des produits artisanaux pour les fêtes dans un buffet à volonté !', '2024-12-25', 'Place du Théâtre', false, 'e6020ebb-c2d4-4c48-b68e-d6648fc5733b.jpeg', 180, 10, 1, 11);


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
                                                              ('Espace Échanges Conférence Tech', true, 6);

-- Fill `message` table
INSERT INTO message (content, type, sending_date, user_id, discussion_event_id) VALUES
                                                                                    ('Vivement le concert !', 0, '2024-11-30', 1, 1),
                                                                                    ('Hâte d en apprendre plus sur les nouvelles technologies.', 0, '2024-11-30', 2, 2),
                                                                                    ('J’ai hâte de danser toute la nuit au Festival Electro !', 0, '2025-07-18', 1, 4),
                                                                                    ('Quelqu’un peut m’expliquer où trouver des places pour le Festival ?', 0, '2025-07-19', 2, 4),
                                                                                    ('Le marathon de cette année promet d’être épique !', 0, '2025-04-10', 3, 5),
                                                                                    ('La Soirée Disco sera incroyable !', 0, '2025-07-20', 4, 6),
                                                                                    ('La conférence abordera-t-elle les dernières avancées en IA ?', 0, '2024-12-05', 5, 7);

-- Fill `linkUserEvent` table
INSERT INTO linkUserEvent (user_id, event_id, is_waiting, is_accepted) VALUES
                                                                         (1, 1, false, true),
                                                                         (2, 2, false, true),
                                                                         (1, 3, true, false),
                                                                         (2, 3, true, false), -- Jane Doe attend une confirmation pour le Festival Electro
                                                                         (3, 4, false, true), -- John Smith participe au Marathon
                                                                         (4, 5, false, true), -- Charlie Brown participe à la Soirée Disco
                                                                         (5, 6, false, true), -- Emily Wilson participe à la Conférence Tech
                                                                         (6, 8, true, false), -- Mike Taylor attend une confirmation pour la Soirée de fin d’année
                                                                         (7, 8, false, true), -- Sarah Johnson participe à la Soirée de fin d’année
                                                                         (8, 1, true, false); -- David Lee attend une confirmation pour le Concert de Jazz
