package com.example.backend.mapper;

// ============== MAPPERS ==============

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityDTOMapper {

    // Client mappings
    public ClientDTO toClientDTO(Client client) {
        if (client == null) return null;
        ClientDTO dto = new ClientDTO();
        dto.setIdClient(client.getIdClient());
        dto.setNomClient(client.getNomClient());
        dto.setPrenomClient(client.getPrenomClient());
        dto.setMailClient(client.getMailClient());
        return dto;
    }

    public Client toClientEntity(ClientDTO dto) {
        if (dto == null) return null;
        Client client = new Client();
        client.setIdClient(dto.getIdClient());
        client.setNomClient(dto.getNomClient());
        client.setPrenomClient(dto.getPrenomClient());
        client.setMailClient(dto.getMailClient());
        return client;
    }

    // Medicament mappings
    public MedicamentDTO toMedicamentDTO(Medicament medicament) {
        if (medicament == null) return null;
        MedicamentDTO dto = new MedicamentDTO();
        dto.setNomMedoc(medicament.getNomMedoc());
        dto.setCategorie(medicament.getCategorie());
        return dto;
    }

    public Medicament toMedicamentEntity(MedicamentDTO dto) {
        if (dto == null) return null;
        Medicament medicament = new Medicament();
        medicament.setNomMedoc(dto.getNomMedoc());
        medicament.setCategorie(dto.getCategorie());
        return medicament;
    }

    // Gerant mappings
    public GerantDTO toGerantDTO(Gerant gerant) {
        if (gerant == null) return null;
        GerantDTO dto = new GerantDTO();
        dto.setIdGerant(gerant.getIdGerant());
        dto.setNomGerant(gerant.getNomGerant());
        dto.setPrenomGerant(gerant.getPrenomGerant());
        dto.setAnneeExperience(gerant.getAnneeExperience());
        return dto;
    }

    public Gerant toGerantEntity(GerantDTO dto) {
        if (dto == null) return null;
        Gerant gerant = new Gerant();
        gerant.setIdGerant(dto.getIdGerant());
        gerant.setNomGerant(dto.getNomGerant());
        gerant.setPrenomGerant(dto.getPrenomGerant());
        gerant.setAnneeExperience(dto.getAnneeExperience());
        return gerant;
    }

    public PharmacieDTO toPharmacieDTO(Pharmacie pharmacie) {
        if (pharmacie == null) return null;
        PharmacieDTO dto = new PharmacieDTO();
        dto.setIdPharmacie(pharmacie.getIdPharmacie());
        dto.setNomPharmacie(pharmacie.getNomPharmacie());
        dto.setLatitude(pharmacie.getLatitude());
        dto.setLongitude(pharmacie.getLongitude());
        dto.setAdressePharmacie(pharmacie.getAdressePharmacie());
        dto.setContactTelephonique(pharmacie.getContactTelephonique());
        if (pharmacie.getGerant() != null) {
            dto.setIdGerant(pharmacie.getGerant().getIdGerant());
            dto.setGerant(toGerantDTO(pharmacie.getGerant()));
        }
        if (pharmacie.getDisponibilites() != null) {
            dto.setDisponibilites(pharmacie.getDisponibilites().stream()
                    .map(this::toDisponibiliteDTO)
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    public Pharmacie toPharmacieEntity(PharmacieDTO dto) {
        if (dto == null) return null;
        Pharmacie pharmacie = new Pharmacie();
        pharmacie.setIdPharmacie(dto.getIdPharmacie());
        pharmacie.setNomPharmacie(dto.getNomPharmacie());
        pharmacie.setLatitude(dto.getLatitude());
        pharmacie.setLongitude(dto.getLongitude());
        pharmacie.setAdressePharmacie(dto.getAdressePharmacie());
        pharmacie.setContactTelephonique(dto.getContactTelephonique());
        if (dto.getGerant() != null) {
            pharmacie.setGerant(toGerantEntity(dto.getGerant()));
        }
        if (dto.getDisponibilites() != null) {
            pharmacie.setDisponibilites(dto.getDisponibilites().stream()
                    .map(this::toDisponibiliteEntity)
                    .collect(Collectors.toList()));
        }
        return pharmacie;
    }

    // Disponibilite mappings
    public DisponibiliteDTO toDisponibiliteDTO(Disponibilite disponibilite) {
        if (disponibilite == null) return null;
        DisponibiliteDTO dto = new DisponibiliteDTO();
        dto.setId(disponibilite.getId());
        dto.setJour(disponibilite.getJour());
        dto.setHoraireOuverture(disponibilite.getHoraireOuverture());
        dto.setHoraireFermeture(disponibilite.getHoraireFermeture());
        if (disponibilite.getPharmacie() != null) {
            dto.setIdPharmacie(disponibilite.getPharmacie().getIdPharmacie());
        }
        return dto;
    }

    public Disponibilite toDisponibiliteEntity(DisponibiliteDTO dto) {
        if (dto == null) return null;
        Disponibilite disponibilite = new Disponibilite();
        disponibilite.setId(dto.getId());
        disponibilite.setJour(dto.getJour());
        disponibilite.setHoraireOuverture(dto.getHoraireOuverture());
        disponibilite.setHoraireFermeture(dto.getHoraireFermeture());
        return disponibilite;
    }

    // StockMedoc mappings
    public StockMedocDTO toStockMedocDTO(StockMedoc stockMedoc) {
        if (stockMedoc == null) return null;
        StockMedocDTO dto = new StockMedocDTO();
        dto.setIdPharmacie(stockMedoc.getIdPharmacie());
        dto.setNomMedoc(stockMedoc.getNomMedoc());
        dto.setQuantite(stockMedoc.getQuantite());
        dto.setPrix(stockMedoc.getPrix());
        if (stockMedoc.getPharmacie() != null) {
            dto.setNomPharmacie(stockMedoc.getPharmacie().getNomPharmacie());
        }
        if (stockMedoc.getMedicament() != null) {
            dto.setCategorieMedicament(stockMedoc.getMedicament().getCategorie());
        }
        return dto;
    }

    public StockMedoc toStockMedocEntity(StockMedocDTO dto) {
        if (dto == null) return null;
        StockMedoc stockMedoc = new StockMedoc();
        stockMedoc.setIdPharmacie(dto.getIdPharmacie());
        stockMedoc.setNomMedoc(dto.getNomMedoc());
        stockMedoc.setQuantite(dto.getQuantite());
        stockMedoc.setPrix(dto.getPrix());
        return stockMedoc;
    }

    public AcheterDTO toAcheterDTO(Acheter acheter) {
        if (acheter == null) return null;
        AcheterDTO acheterDTO = new AcheterDTO();
        acheterDTO.setIdClient(acheter.getIdClient());
        acheterDTO.setNomMedoc(acheter.getNomMedoc());
        acheterDTO.setQuantite(acheter.getQuantite());
        acheterDTO.setDateAchat(acheter.getDateAchat());
        return acheterDTO;
    }
    public Acheter toAcheterEntity(AcheterDTO dto) {
        if (dto == null) return null;
        Acheter acheter = new Acheter();
        acheter.setIdClient(dto.getIdClient());
        acheter.setNomMedoc(dto.getNomMedoc());
        acheter.setQuantite(dto.getQuantite());
        acheter.setDateAchat(dto.getDateAchat());
        return acheter;
    }
    public List<ClientDTO> toClientDTOList(List<Client> clients) {
        return clients.stream().map(this::toClientDTO).collect(Collectors.toList());
    }

    public List<Client> toClientEntityList(List<ClientDTO> dtos) {
        return dtos.stream().map(this::toClientEntity).collect(Collectors.toList());
    }

    public List<MedicamentDTO> toMedicamentDTOList(List<Medicament> medicaments) {
        return medicaments.stream().map(this::toMedicamentDTO).collect(Collectors.toList());
    }

    public List<Medicament> toMedicamentEntityList(List<MedicamentDTO> dtos) {
        return dtos.stream().map(this::toMedicamentEntity).collect(Collectors.toList());
    }

    public List<GerantDTO> toGerantDTOList(List<Gerant> gerants) {
        return gerants.stream().map(this::toGerantDTO).collect(Collectors.toList());
    }

    public List<Gerant> toGerantEntityList(List<GerantDTO> dtos) {
        return dtos.stream().map(this::toGerantEntity).collect(Collectors.toList());
    }

    public List<PharmacieDTO> toPharmacieDTO

            (List<Pharmacie> pharmacies) {
        return pharmacies.stream().map(this::toPharmacieDTO).collect(Collectors.toList());
    }

    public List<Pharmacie> toPharmacieEntityList(List<PharmacieDTO> dtos) {
        return dtos.stream().map(this::toPharmacieEntity).collect(Collectors.toList());
    }

    public List<DisponibiliteDTO> toDisponibiliteDTOList(List<Disponibilite> disponibilites) {
        return disponibilites.stream().map(this::toDisponibiliteDTO).collect(Collectors.toList());
    }

    public List<Disponibilite> toDisponibiliteEntityList(List<DisponibiliteDTO> dtos) {
        return dtos.stream().map(this::toDisponibiliteEntity).collect(Collectors.toList());
    }

    public List<StockMedocDTO> toStockMedocDTOList(List<StockMedoc> stocks) {
        return stocks.stream().map(this::toStockMedocDTO).collect(Collectors.toList());
    }

    public List<StockMedoc> toStockMedocEntityList(List<StockMedocDTO> dtos) {
        return dtos.stream().map(this::toStockMedocEntity).collect(Collectors.toList());
    }

    public List<AcheterDTO> toAcheterDTOList(List<Acheter> achats) {
        return achats.stream().map(this::toAcheterDTO).collect(Collectors.toList());
    }

    public List<Acheter> toAcheterEntityList(List<AcheterDTO> dtos) {
        return dtos.stream().map(this::toAcheterEntity).collect(Collectors.toList());
    }
}