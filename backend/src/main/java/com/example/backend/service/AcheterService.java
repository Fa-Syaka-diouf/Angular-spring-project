package com.example.backend.service;

import com.example.backend.dto.AcheterDTO;
import com.example.backend.entity.Acheter;
import com.example.backend.entity.AcheterId;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.AcheterRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AcheterService {

    @Autowired
    private AcheterRepository acheterRepository;

    @Autowired
    private EntityDTOMapper mapper;

    public List<AcheterDTO> getAllAchats() {
        return mapper.toAcheterDTOList(acheterRepository.findAll());
    }

    public List<AcheterDTO> getAchatsByClient(Integer idClient) {
        return mapper.toAcheterDTOList(acheterRepository.findByIdClient(idClient));
    }

    public List<AcheterDTO> getRecentAchatsByClient(Integer idClient) {
        return mapper.toAcheterDTOList(acheterRepository.findRecentPurchasesByClient(idClient));
    }

    public AcheterDTO saveAchat(AcheterDTO achatDTO) {
        Acheter achat = mapper.toAcheterEntity(achatDTO);
        Acheter savedAchat = acheterRepository.save(achat);
        return mapper.toAcheterDTO(savedAchat);
    }

    public void deleteAchat(Integer idClient, String nomMedoc, java.time.LocalDate dateAchat) {
        AcheterId id = new AcheterId(idClient, nomMedoc, dateAchat);
        acheterRepository.deleteById(id);
    }
}
