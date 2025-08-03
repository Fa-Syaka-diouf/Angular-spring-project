package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockMedocId implements java.io.Serializable {
    private Integer idPharmacie;
    private String nomMedoc;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StockMedocId that = (StockMedocId) o;
        return Objects.equals(idPharmacie, that.idPharmacie) &&
                Objects.equals(nomMedoc, that.nomMedoc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPharmacie, nomMedoc);
    }
}