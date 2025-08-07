package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StockMedocDTO {
    private Integer idPharmacie;
    private String nomMedoc;
    private Integer quantite;
    private BigDecimal prix;
    private String nomPharmacie;
}