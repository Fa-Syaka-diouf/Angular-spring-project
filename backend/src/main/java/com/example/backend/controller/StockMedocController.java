package com.example.backend.controller;

import com.example.backend.dto.StockMedocDTO;
import com.example.backend.service.StockMedocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockMedocController {

    @Autowired
    private StockMedocService stockMedocService;

    @GetMapping
    public ResponseEntity<List<StockMedocDTO>> getAllStocks() {
        List<StockMedocDTO> stocks = stockMedocService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/pharmacie/{idPharmacie}")
    public ResponseEntity<List<StockMedocDTO>> getStockByPharmacie(@PathVariable Integer idPharmacie) {
        List<StockMedocDTO> stocks = stockMedocService.getStockByPharmacie(idPharmacie);
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/medicament/{nomMedoc}")
    public ResponseEntity<List<StockMedocDTO>> getStockByMedicament(@PathVariable String nomMedoc) {
        List<StockMedocDTO> stocks = stockMedocService.getStockByMedicament(nomMedoc);
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/available/{idPharmacie}")
    public ResponseEntity<List<StockMedocDTO>> getAvailableStock(@PathVariable Integer idPharmacie) {
        List<StockMedocDTO> stocks = stockMedocService.getAvailableStock(idPharmacie);
        return ResponseEntity.ok(stocks);
    }

    @PostMapping
    public ResponseEntity<StockMedocDTO> createStock(@RequestBody StockMedocDTO stockDTO) {
        StockMedocDTO savedStock = stockMedocService.saveStock(stockDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStock);
    }

    @PutMapping("/{idPharmacie}/{nomMedoc}")
    public ResponseEntity<StockMedocDTO> updateStock(@PathVariable Integer idPharmacie,
                                                     @PathVariable String nomMedoc,
                                                     @RequestBody StockMedocDTO stockDTO) {
        stockDTO.setIdPharmacie(idPharmacie);
        stockDTO.setNomMedoc(nomMedoc);
        StockMedocDTO updatedStock = stockMedocService.saveStock(stockDTO);
        return ResponseEntity.ok(updatedStock);
    }

    @DeleteMapping("/{idPharmacie}/{nomMedoc}")
    public ResponseEntity<Void> deleteStock(@PathVariable Integer idPharmacie, @PathVariable String nomMedoc) {
        stockMedocService.deleteStock(idPharmacie, nomMedoc);
        return ResponseEntity.noContent().build();
    }
}
