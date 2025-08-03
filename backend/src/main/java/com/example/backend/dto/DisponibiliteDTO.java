package com.example.backend.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class DisponibiliteDTO {
    private Integer id;
    private String jour;
    private LocalTime horaireOuverture;
    private LocalTime horaireFermeture;
    private Integer idPharmacie;
}
