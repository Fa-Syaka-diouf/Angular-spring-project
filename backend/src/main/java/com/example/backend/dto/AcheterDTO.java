package com.example.backend.dto;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AcheterDTO {
    private Integer idClient;
    private String nomMedoc;
    private LocalDate dateAchat;
    private Integer quantite;
}
