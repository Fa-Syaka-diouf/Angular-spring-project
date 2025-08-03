package com.example.backend.repository;

import com.example.backend.entity.Acheter;
import com.example.backend.entity.AcheterId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcheterRepository extends JpaRepository<Acheter, AcheterId> {
    List<Acheter> findByIdClient(Integer idClient);
    List<Acheter> findByNomMedoc(String nomMedoc);
    List<Acheter> findByDateAchat(java.time.LocalDate dateAchat);

    @Query("SELECT a FROM Acheter a WHERE a.idClient = :idClient ORDER BY a.dateAchat DESC")
    List<Acheter> findRecentPurchasesByClient(@Param("idClient") Integer idClient);
}