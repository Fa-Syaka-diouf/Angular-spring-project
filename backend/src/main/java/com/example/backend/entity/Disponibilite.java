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
@Table(name = "disponibilite")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disponibilite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "jour", length = 50)
    private String jour;

    @Column(name = "horaire_ouverture")
    private LocalTime horaireOuverture;

    @Column(name = "horaire_fermeture")
    private LocalTime horaireFermeture;

    @ManyToOne
    @JoinColumn(name = "id_pharmacie")
    private Pharmacie pharmacie;
}