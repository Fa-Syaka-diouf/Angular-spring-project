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
@Table(name = "client")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_client")
    private Integer idClient;

    @Column(name = "nom_client", length = 100)
    private String nomClient;

    @Column(name = "prenom_client", length = 100)
    private String prenomClient;

    @Column(name = "mail_client", length = 100, unique = true, nullable = false)
    private String mailClient;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Acheter> achats;
}