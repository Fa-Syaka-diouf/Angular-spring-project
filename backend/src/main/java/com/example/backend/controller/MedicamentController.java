package com.example.backend.controller;

import com.example.backend.dto.MedicamentDTO;
import com.example.backend.service.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medicaments")
@CrossOrigin(origins = "*")
public class MedicamentController {

    @Autowired
    private MedicamentService medicamentService;

    @GetMapping
    public ResponseEntity<List<MedicamentDTO>> getAllMedicaments() {
        List<MedicamentDTO> medicaments = medicamentService.getAllMedicaments();
        return ResponseEntity.ok(medicaments);
    }

    @GetMapping("/{name}")
    public ResponseEntity<MedicamentDTO> getMedicamentByName(@PathVariable String name) {
        Optional<MedicamentDTO> medicament = medicamentService.getMedicamentByName(name);
        return medicament.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MedicamentDTO>> getMedicamentsByCategory(@PathVariable String category) {
        List<MedicamentDTO> medicaments = medicamentService.getMedicamentsByCategory(category);
        return ResponseEntity.ok(medicaments);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = medicamentService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<MedicamentDTO> createMedicament(@RequestBody MedicamentDTO medicamentDTO) {
        MedicamentDTO savedMedicament = medicamentService.saveMedicament(medicamentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMedicament);
    }

    @PutMapping("/{name}")
    public ResponseEntity<MedicamentDTO> updateMedicament(@PathVariable String name, @RequestBody MedicamentDTO medicamentDTO) {
        medicamentDTO.setNomMedoc(name);
        MedicamentDTO updatedMedicament = medicamentService.saveMedicament(medicamentDTO);
        return ResponseEntity.ok(updatedMedicament);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deleteMedicament(@PathVariable String name) {
        medicamentService.deleteMedicament(name);
        return ResponseEntity.noContent().build();
    }
}

