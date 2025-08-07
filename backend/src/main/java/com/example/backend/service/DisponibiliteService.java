package com.example.backend.service;


import com.example.backend.dto.DisponibiliteDTO;
import com.example.backend.entity.Disponibilite;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.DisponibiliteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DisponibiliteService {

    @Autowired
    private DisponibiliteRepository disponibiliteRepository;
    @Autowired
    private EntityDTOMapper mapper;

    public List<DisponibiliteDTO> getAllDisponibilites(){
        return mapper.toDisponibiliteDTOList(disponibiliteRepository.findAll());
    }
    public List<DisponibiliteDTO> getDisponibiliteByIdPharmacie(Integer id) {
        return mapper.toDisponibiliteDTOList(disponibiliteRepository.findByPharmacie_IdPharmacie(id));
    }

    public DisponibiliteDTO saveDisponibilite(DisponibiliteDTO dto) {
        Disponibilite disponibilite = mapper.toDisponibiliteEntity(dto);
        Disponibilite saved = disponibiliteRepository.save(disponibilite);
        return mapper.toDisponibiliteDTO(saved);
    }
    public void deletedisponibilite(Integer id) {
        disponibiliteRepository.deleteById(id);
    }
}
