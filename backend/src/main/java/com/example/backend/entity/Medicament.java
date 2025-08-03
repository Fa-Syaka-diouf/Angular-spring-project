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
@Table(name = "medicament")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medicament {
    @Id
    @Column(name = "nom_medoc", length = 100)
    private String nomMedoc;

    @Column(name = "categorie", length = 100)
    private String categorie;

    @OneToMany(mappedBy = "medicament", cascade = CascadeType.ALL)
    private List<StockMedoc> stocks;

    @OneToMany(mappedBy = "medicament", cascade = CascadeType.ALL)
    private List<Acheter> achats;
}