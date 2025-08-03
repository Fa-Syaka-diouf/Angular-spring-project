package com.example.backend.repository;

import com.example.backend.entity.Disponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Integer> {
    List<Disponibilite> findByPharmacie_IdPharmacie(Integer idPharmacie);
    List<Disponibilite> findByJour(String jour);
}