package com.example.backend.controller;

import com.example.backend.dto.PharmacieDTO;
import com.example.backend.service.PharmacieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pharmacies")
@CrossOrigin(origins = "*")
public class PharmacieController {

    @Autowired
    private PharmacieService pharmacieService;

    @GetMapping
    public ResponseEntity<List<PharmacieDTO>> getAllPharmacies() {
        List<PharmacieDTO> pharmacies = pharmacieService.getAllPharmacies();
        return ResponseEntity.ok(pharmacies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PharmacieDTO> getPharmacieById(@PathVariable Integer id) {
        Optional<PharmacieDTO> pharmacie = pharmacieService.getPharmacieById(id);
        return pharmacie.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PharmacieDTO> createPharmacie(@RequestBody PharmacieDTO pharmacieDTO) {
        PharmacieDTO savedPharmacie = pharmacieService.savePharmacie(pharmacieDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPharmacie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PharmacieDTO> updatePharmacie(@PathVariable Integer id, @RequestBody PharmacieDTO pharmacieDTO) {
        pharmacieDTO.setIdPharmacie(id);
        PharmacieDTO updatedPharmacie = pharmacieService.savePharmacie(pharmacieDTO);
        return ResponseEntity.ok(updatedPharmacie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacie(@PathVariable Integer id) {
        pharmacieService.deletePharmacie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PharmacieDTO>> searchPharmaciesByName(@RequestParam String name) {
        List<PharmacieDTO> pharmacies = pharmacieService.searchPharmaciesByName(name);
        return ResponseEntity.ok(pharmacies);
    }

    @GetMapping("/medicament/{medicamentName}")
    public ResponseEntity<List<PharmacieDTO>> getPharmaciesWithMedicament(@PathVariable String medicamentName) {
        List<PharmacieDTO> pharmacies = pharmacieService.getPharmaciesWithMedicament(medicamentName);
        return ResponseEntity.ok(pharmacies);
    }
}
