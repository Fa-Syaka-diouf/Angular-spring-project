package com.example.backend.service;

import com.example.backend.dto.MedicamentDTO;
import com.example.backend.entity.Medicament;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.MedicamentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicamentService {

    @Autowired
    private MedicamentRepository medicamentRepository;

    @Autowired
    private EntityDTOMapper mapper;

    public List<MedicamentDTO> getAllMedicaments() {
        return mapper.toMedicamentDTOList(medicamentRepository.findAll());
    }

    public Optional<MedicamentDTO> getMedicamentByName(String name) {
        return medicamentRepository.findById(name).map(mapper::toMedicamentDTO);
    }

    public MedicamentDTO saveMedicament(MedicamentDTO medicamentDTO) {
        Medicament medicament = mapper.toMedicamentEntity(medicamentDTO);
        Medicament savedMedicament = medicamentRepository.save(medicament);
        return mapper.toMedicamentDTO(savedMedicament);
    }

    public void deleteMedicament(String name) {
        medicamentRepository.deleteById(name);
    }

    public List<MedicamentDTO> getMedicamentsByCategory(String category) {
        return mapper.toMedicamentDTOList(medicamentRepository.findByCategorie(category));
    }

    public List<String> getAllCategories() {
        return medicamentRepository.findAllCategories();
    }
}
