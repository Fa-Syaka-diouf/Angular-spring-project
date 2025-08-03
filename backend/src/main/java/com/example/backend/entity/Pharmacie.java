package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "pharmacie")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pharmacie")
    private Integer idPharmacie;

    @Column(name = "nom_pharmacie", length = 150, nullable = false)
    private String nomPharmacie;

    @Column(name = "latitude", precision = 9, scale = 6, nullable = false)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 9, scale = 6, nullable = false)
    private BigDecimal longitude;

    @Column(name = "contact_telephonique", length = 20, nullable = false)
    private String contactTelephonique;

    @Column(name = "adresse_pharmacie", length = 255, nullable = false)
    private String adressePharmacie;

    @ManyToOne
    @JoinColumn(name = "id_gerant")
    private Gerant gerant;

    @OneToMany(mappedBy = "pharmacie", cascade = CascadeType.ALL)
    private List<Disponibilite> disponibilites;

    @OneToMany(mappedBy = "pharmacie", cascade = CascadeType.ALL)
    private List<StockMedoc> stocks;
}