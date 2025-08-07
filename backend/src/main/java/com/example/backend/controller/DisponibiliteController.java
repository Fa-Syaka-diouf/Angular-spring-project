package com.example.backend.controller;


import com.example.backend.dto.DisponibiliteDTO;
import com.example.backend.service.DisponibiliteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/disponibilites")
@CrossOrigin(origins = "*")

public class DisponibiliteController {

    @Autowired
    private DisponibiliteService disponibiliteService;

    @GetMapping
    public ResponseEntity<List<DisponibiliteDTO>> getAllDisponibilites() {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getAllDisponibilites();
        return ResponseEntity.ok(disponibilites);
    }

    @GetMapping("/{id_pharmacie}")
    public ResponseEntity<List<DisponibiliteDTO>> getDisponibiliteByIdPharmacie(@PathVariable Integer id_pharmacie) {
        List<DisponibiliteDTO> disponibilites = disponibiliteService.getDisponibiliteByIdPharmacie(id_pharmacie);
        return ResponseEntity.ok(disponibilites);
    }

    @PostMapping
    public ResponseEntity<DisponibiliteDTO> createDisponibilite(@RequestBody DisponibiliteDTO dto) {
        DisponibiliteDTO savedDisponibilite = disponibiliteService.saveDisponibilite(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDisponibilite);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacie(@PathVariable Integer id) {
        disponibiliteService.deletedisponibilite(id);
        return ResponseEntity.noContent().build();
    }
}
