package com.example.backend.repository;

import com.example.backend.entity.Pharmacie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PharmacieRepository extends JpaRepository<Pharmacie, Integer> {
    List<Pharmacie> findByNomPharmacieContainingIgnoreCase(String nom);
    List<Pharmacie> findByGerant_IdGerant(Integer idGerant);
    List<Pharmacie> findByAdressePharmacieContainingIgnoreCase(String adresse);

    @Query("SELECT p FROM Pharmacie p JOIN p.stocks s WHERE s.nomMedoc = :nomMedoc AND s.quantite > 0")
    List<Pharmacie> findPharmaciesWithMedicamentInStock(@Param("nomMedoc") String nomMedoc);
}
