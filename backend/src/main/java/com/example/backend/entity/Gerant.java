package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@Entity
@Table(name = "gerant")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gerant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gerant")
    private Integer idGerant;

    @Column(name = "nom_gerant", length = 100)
    private String nomGerant;

    @Column(name = "prenom_gerant", length = 100)
    private String prenomGerant;

    @Column(name = "annee_experience")
    private Integer anneeExperience;

    @OneToMany(mappedBy = "gerant", cascade = CascadeType.ALL)
    private List<Pharmacie> pharmacies;
}
