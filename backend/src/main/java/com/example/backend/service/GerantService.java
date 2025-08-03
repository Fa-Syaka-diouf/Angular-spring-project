package com.example.backend.service;

import com.example.backend.dto.GerantDTO;
import com.example.backend.entity.Gerant;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.GerantRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GerantService {

    @Autowired
    private GerantRepository gerantRepository;

    @Autowired
    private EntityDTOMapper mapper;

    public List<GerantDTO> getAllGerants() {
        return mapper.toGerantDTOList(gerantRepository.findAll());
    }

    public Optional<GerantDTO> getGerantById(Integer id) {
        return gerantRepository.findById(id).map(mapper::toGerantDTO);
    }

    public GerantDTO saveGerant(GerantDTO gerantDTO) {
        Gerant gerant = mapper.toGerantEntity(gerantDTO);
        Gerant savedGerant = gerantRepository.save(gerant);
        return mapper.toGerantDTO(savedGerant);
    }

    public void deleteGerant(Integer id) {
        gerantRepository.deleteById(id);
    }

    public List<GerantDTO> getGerantsByExperience(Integer minExperience) {
        return mapper.toGerantDTOList(gerantRepository.findByAnneeExperienceGreaterThan(minExperience));
    }
}
