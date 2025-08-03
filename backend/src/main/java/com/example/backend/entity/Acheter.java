package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "acheter")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(AcheterId.class)
public class Acheter {
    @Id
    @Column(name = "id_client")
    private Integer idClient;

    @Id
    @Column(name = "nom_medoc", length = 100)
    private String nomMedoc;

    @Id
    @Column(name = "date_achat")
    private LocalDate dateAchat;

    @Column(name = "quantite")
    private Integer quantite;

    // CORRECTION: Le nom de la colonne doit correspondre à la FK dans la DB
    @ManyToOne
    @JoinColumn(name = "id_client", insertable = false, updatable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "nom_medoc", insertable = false, updatable = false)
    private Medicament medicament;
}