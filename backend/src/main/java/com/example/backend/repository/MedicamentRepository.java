package com.example.backend.repository;

import com.example.backend.entity.Medicament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicamentRepository extends JpaRepository<Medicament, String> {
    List<Medicament> findByCategorie(String categorie);
    List<Medicament> findByNomMedocContainingIgnoreCase(String nom);

    @Query("SELECT DISTINCT m.categorie FROM Medicament m")
    List<String> findAllCategories();
}
