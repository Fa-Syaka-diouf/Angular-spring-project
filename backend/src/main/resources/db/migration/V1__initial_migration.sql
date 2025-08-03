CREATE TABLE client (
                        id_client INT AUTO_INCREMENT PRIMARY KEY,  -- Ajout AUTO_INCREMENT
                        nom_client VARCHAR(100),
                        prenom_client VARCHAR(100),
                        mail_client VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE gerant (
                        id_gerant INT AUTO_INCREMENT PRIMARY KEY,  -- Ajout AUTO_INCREMENT
                        nom_gerant VARCHAR(100),
                        prenom_gerant VARCHAR(100),
                        annee_experience INT
);

CREATE TABLE pharmacie (
                           id_pharmacie INT AUTO_INCREMENT PRIMARY KEY,  -- Ajout AUTO_INCREMENT
                           nom_pharmacie VARCHAR(150) NOT NULL,
                           latitude DECIMAL(9,6) NOT NULL,
                           longitude DECIMAL(9,6) NOT NULL,
                           contact_telephonique VARCHAR(20) NOT NULL,
                           adresse_pharmacie VARCHAR(255) NOT NULL,
                           id_gerant INT,
                           FOREIGN KEY (id_gerant) REFERENCES gerant(id_gerant)
);

CREATE TABLE disponibilite (
                               id INT AUTO_INCREMENT PRIMARY KEY,  -- Ajout AUTO_INCREMENT
                               jour VARCHAR(50),
                               horaire_ouverture TIME,
                               horaire_fermeture TIME,
                               id_pharmacie INT,
                               FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id_pharmacie)
);

-- Les autres tables restent identiques
CREATE TABLE medicament (
                            nom_medoc VARCHAR(100) PRIMARY KEY,
                            categorie VARCHAR(100)
);

CREATE TABLE acheter (
                         id_client INT,
                         nom_medoc VARCHAR(100),
                         date_achat DATE,
                         quantite INT,
                         PRIMARY KEY (id_client, nom_medoc, date_achat),
                         FOREIGN KEY (id_client) REFERENCES client(id_client),
                         FOREIGN KEY (nom_medoc) REFERENCES medicament(nom_medoc)
);

CREATE TABLE stock_medoc (
                             id_pharmacie INT NOT NULL,
                             nom_medoc VARCHAR(100) NOT NULL,
                             quantite INT,
                             prix DECIMAL(10,2),
                             PRIMARY KEY (id_pharmacie, nom_medoc),
                             FOREIGN KEY (id_pharmacie) REFERENCES pharmacie(id_pharmacie),
                             FOREIGN KEY (nom_medoc) REFERENCES medicament(nom_medoc)
);