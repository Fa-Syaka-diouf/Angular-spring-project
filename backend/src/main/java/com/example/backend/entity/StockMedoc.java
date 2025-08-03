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
@Table(name = "stock_medoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(StockMedocId.class)
public class StockMedoc {
    @Id
    @Column(name = "id_pharmacie")
    private Integer idPharmacie;

    @Id
    @Column(name = "nom_medoc", length = 100)
    private String nomMedoc;

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "prix", precision = 10, scale = 2)
    private BigDecimal prix;

    @ManyToOne
    @JoinColumn(name = "id_pharmacie", insertable = false, updatable = false)
    private Pharmacie pharmacie;

    @ManyToOne
    @JoinColumn(name = "nom_medoc", insertable = false, updatable = false)
    private Medicament medicament;
}
