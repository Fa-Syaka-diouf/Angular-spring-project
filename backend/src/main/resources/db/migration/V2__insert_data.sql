-- Insertion des données dans la table client
INSERT INTO client (nom_client, prenom_client, mail_client) VALUES
                                                                           ( 'Diop', 'Fatou', 'fatou.diop@email.com'),
                                                                           ( 'Fall', 'Moussa', 'moussa.fall@email.com'),
                                                                           ( 'Ndiaye', 'Aminata', 'aminata.ndiaye@email.com'),
                                                                           ( 'Sarr', 'Ousmane', 'ousmane.sarr@email.com');

-- Insertion des données dans la table medicament
INSERT INTO medicament (nom_medoc, categorie) VALUES
                                                  ('Paracétamol', 'Antalgique'),
                                                  ('Amoxicilline', 'Antibiotique'),
                                                  ('Doliprane', 'Antalgique'),
                                                  ('Efferalgan', 'Antalgique');

-- Insertion des données dans la table gerant
INSERT INTO gerant (nom_gerant, prenom_gerant, annee_experience) VALUES
                                                                                ( 'Ba', 'Ibrahima', 15),
                                                                                ( 'Seck', 'Mariama', 8),
                                                                                ( 'Diouf', 'Cheikh', 12),
                                                                                ( 'Gueye', 'Awa', 6);

-- Insertion des données dans la table pharmacie
INSERT INTO pharmacie ( nom_pharmacie, latitude, longitude, contact_telephonique, adresse_pharmacie, id_gerant) VALUES
                                                                                                                                 ( 'Pharmacie du Centre', 14.693425, -17.447938, '+221 33 821 4567', 'Avenue Léopold Sédar Senghor, Dakar', 1),
                                                                                                                                 ( 'Pharmacie Plateau', 14.674459, -17.441029, '+221 33 822 3456', 'Place de l''Indépendance', 2),
                                                                                                                                 ( 'Pharmacie Médina', 14.685973, -17.464924, '+221 33 823 7890', 'Rue de Thiong, Médina, Dakar', 3),
                                                                                                                                 ('Pharmacie Point E', 14.712847, -17.467586, '+221 33 824 1234', 'Avenue Cheikh Anta Diop, Point E, Dakar', 4);

-- Insertion des données dans la table disponibilite
INSERT INTO disponibilite (jour, horaire_ouverture, horaire_fermeture, id_pharmacie) VALUES
('Lundi', '08:00:00', '20:00:00', 1),
('Mardi', '08:00:00', '20:00:00', 1),
('Mercredi', '09:00:00', '19:00:00', 2),
('Jeudi', '09:00:00', '19:00:00', 2);

-- Insertion des données dans la table stock_medoc
INSERT INTO stock_medoc (id_pharmacie, nom_medoc, quantite, prix) VALUES
(1, 'Paracétamol', 150, 500.00),
(1, 'Amoxicilline', 80, 2500.00),
(1, 'Doliprane', 120, 450.00),
(1, 'Efferalgan', 90, 550.00),
(2, 'Paracétamol', 200, 480.00),
(2, 'Amoxicilline', 60, 2600.00),
(2, 'Doliprane', 100, 470.00),
(2, 'Efferalgan', 75, 580.00),
(3, 'Paracétamol', 180, 520.00),
(3, 'Amoxicilline', 95, 2450.00),
(3, 'Doliprane', 110, 460.00),
(3, 'Efferalgan', 85, 560.00),
(4, 'Paracétamol', 160, 510.00),
(4, 'Amoxicilline', 70, 2550.00),
(4, 'Doliprane', 130, 440.00),
(4, 'Efferalgan', 95, 570.00);

-- Insertion des données dans la table acheter
INSERT INTO acheter (id_client, nom_medoc, date_achat, quantite) VALUES
(1, 'Paracétamol', '2024-12-01', 2),
(2, 'Amoxicilline', '2024-12-02', 1),
(3, 'Doliprane', '2024-12-03', 3),
(4, 'Efferalgan', '2024-12-04', 1);