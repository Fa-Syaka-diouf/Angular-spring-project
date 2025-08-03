package com.example.backend.dto;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

@Data
public class PharmacieDTO {
    private Integer idPharmacie;
    private String nomPharmacie;
    private String contactTelephonique;
    private Integer idGerant;
    private GerantDTO gerant;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String adressePharmacie;
    private List<DisponibiliteDTO> disponibilites;
}
