package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcheterId implements java.io.Serializable {
    private Integer idClient;
    private String nomMedoc;
    private LocalDate dateAchat;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AcheterId acheterId = (AcheterId) o;
        return Objects.equals(idClient, acheterId.idClient) &&
                Objects.equals(nomMedoc, acheterId.nomMedoc) &&
                Objects.equals(dateAchat, acheterId.dateAchat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idClient, nomMedoc, dateAchat);
    }
}
