package com.example.backend.controller;

import com.example.backend.dto.GerantDTO;
import com.example.backend.service.GerantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gerants")
@CrossOrigin(origins = "*")
public class GerantController {

    @Autowired
    private GerantService gerantService;

    @GetMapping
    public ResponseEntity<List<GerantDTO>> getAllGerants() {
        List<GerantDTO> gerants = gerantService.getAllGerants();
        return ResponseEntity.ok(gerants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GerantDTO> getGerantById(@PathVariable Integer id) {
        Optional<GerantDTO> gerant = gerantService.getGerantById(id);
        return gerant.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GerantDTO> createGerant(@RequestBody GerantDTO gerantDTO) {
        GerantDTO savedGerant = gerantService.saveGerant(gerantDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGerant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GerantDTO> updateGerant(@PathVariable Integer id, @RequestBody GerantDTO gerantDTO) {
        gerantDTO.setIdGerant(id);
        GerantDTO updatedGerant = gerantService.saveGerant(gerantDTO);
        return ResponseEntity.ok(updatedGerant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGerant(@PathVariable Integer id) {
        gerantService.deleteGerant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/experience/{minExperience}")
    public ResponseEntity<List<GerantDTO>> getGerantsByExperience(@PathVariable Integer minExperience) {
        List<GerantDTO> gerants = gerantService.getGerantsByExperience(minExperience);
        return ResponseEntity.ok(gerants);
    }
}
