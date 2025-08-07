package com.example.backend.service;

import com.example.backend.dto.PharmacieDTO;
import com.example.backend.entity.Pharmacie;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.PharmacieRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PharmacieService {

    @Autowired
    private PharmacieRepository pharmacieRepository;

    @Autowired
    private GerantService gerantService;
    @Autowired
    private EntityDTOMapper mapper;

    public List<PharmacieDTO> getAllPharmacies() {
        return mapper.toPharmacieDTO

                (pharmacieRepository.findAll());
    }

    public Optional<PharmacieDTO> getPharmacieById(Integer id) {
        return pharmacieRepository.findById(id).map(mapper::toPharmacieDTO);
    }

    public PharmacieDTO savePharmacie(PharmacieDTO pharmacieDTO) {
        Pharmacie pharmacie = mapper.toPharmacieEntity(pharmacieDTO);
        Pharmacie savedPharmacie = pharmacieRepository.save(pharmacie);
        return mapper.toPharmacieDTO(savedPharmacie);
    }

    public void deletePharmacie(Integer id) {
        pharmacieRepository.deleteById(id);
    }

    public List<PharmacieDTO> searchPharmaciesByName(String name) {
        return mapper.toPharmacieDTO

                (pharmacieRepository.findByNomPharmacieContainingIgnoreCase(name));
    }

    public List<PharmacieDTO> getPharmaciesWithMedicament(String medicamentName) {
        return mapper.toPharmacieDTO

                (pharmacieRepository.findPharmaciesWithMedicamentInStock(medicamentName));
    }
}
