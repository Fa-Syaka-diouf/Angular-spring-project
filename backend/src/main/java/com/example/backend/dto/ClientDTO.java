package com.example.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class ClientDTO {
    private Integer idClient;
    private String nomClient;
    private String prenomClient;
    private String mailClient;
}