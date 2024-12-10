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

-- Remplir la table `users`
INSERT INTO users (email, password, last_name, first_name, user_name, bio) VALUES
    ('johndoe@example.com', 'password123', 'Doe', 'John', 'johndoe', 'Passionné d événements culturels'),
('janedoe@example.com', 'password456', 'Doe', 'Jane', 'janedoe', 'Amatrice de sport et de plein air');

-- Remplir la table event
INSERT INTO event (title, description, event_date, street_number,is_favorite, user_id, location_id, category_id) VALUES
('Concert de Jazz', 'Un concert de jazz en plein air.', '2024-12-01 20:00:00', '12',true, 1, 1, 1),
('Conférence Tech', 'Une conférence sur les dernières technologies.', '2024-11-15 09:00:00', '45',false, 2, 2, 2),
('Marathon', 'Un marathon annuel pour les amateurs de course.', '2024-11-20 08:00:00', '78',true, 1, 3, 3);

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
