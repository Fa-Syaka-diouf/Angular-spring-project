package com.example.backend.repository;

import com.example.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Optional<Client> findByMailClient(String mailClient);
    List<Client> findByNomClientContainingIgnoreCase(String nom);

    @Query("SELECT c FROM Client c JOIN c.achats a WHERE a.nomMedoc = :nomMedoc")
    List<Client> findClientsByMedicament(@Param("nomMedoc") String nomMedoc);
}