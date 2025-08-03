package com.example.backend.repository;

import com.example.backend.entity.Gerant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GerantRepository extends JpaRepository<Gerant, Integer> {
    List<Gerant> findByNomGerantContainingIgnoreCase(String nom);
    List<Gerant> findByAnneeExperienceGreaterThan(Integer annees);
}
