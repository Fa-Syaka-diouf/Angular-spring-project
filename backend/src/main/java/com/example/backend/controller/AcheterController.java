package com.example.backend.controller;

import com.example.backend.dto.AcheterDTO;
import com.example.backend.service.AcheterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achats")
@CrossOrigin(origins = "*")
public class AcheterController {

    @Autowired
    private AcheterService acheterService;

    @GetMapping
    public ResponseEntity<List<AcheterDTO>> getAllAchats() {
        List<AcheterDTO> achats = acheterService.getAllAchats();
        return ResponseEntity.ok(achats);
    }

    @GetMapping("/client/{idClient}")
    public ResponseEntity<List<AcheterDTO>> getAchatsByClient(@PathVariable Integer idClient) {
        List<AcheterDTO> achats = acheterService.getAchatsByClient(idClient);
        return ResponseEntity.ok(achats);
    }

    @GetMapping("/client/{idClient}/recent")
    public ResponseEntity<List<AcheterDTO>> getRecentAchatsByClient(@PathVariable Integer idClient) {
        List<AcheterDTO> achats = acheterService.getRecentAchatsByClient(idClient);
        return ResponseEntity.ok(achats);
    }

    @PostMapping
    public ResponseEntity<AcheterDTO> createAchat(@RequestBody AcheterDTO achatDTO) {
        AcheterDTO savedAchat = acheterService.saveAchat(achatDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAchat);
    }

    @DeleteMapping("/{idClient}/{nomMedoc}/{dateAchat}")
    public ResponseEntity<Void> deleteAchat(@PathVariable Integer idClient,
                                            @PathVariable String nomMedoc,
                                            @PathVariable String dateAchat) {
        java.time.LocalDate date = java.time.LocalDate.parse(dateAchat);
        acheterService.deleteAchat(idClient, nomMedoc, date);
        return ResponseEntity.noContent().build();
    }
}
