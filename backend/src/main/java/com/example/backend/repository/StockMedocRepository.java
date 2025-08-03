package com.example.backend.repository;

import com.example.backend.entity.StockMedoc;
import com.example.backend.entity.StockMedocId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMedocRepository extends JpaRepository<StockMedoc, StockMedocId> {
    List<StockMedoc> findByIdPharmacie(Integer idPharmacie);
    List<StockMedoc> findByNomMedoc(String nomMedoc);
    List<StockMedoc> findByQuantiteGreaterThan(Integer quantite);

    @Query("SELECT s FROM StockMedoc s WHERE s.idPharmacie = :idPharmacie AND s.quantite > 0")
    List<StockMedoc> findAvailableStockByPharmacie(@Param("idPharmacie") Integer idPharmacie);
}
