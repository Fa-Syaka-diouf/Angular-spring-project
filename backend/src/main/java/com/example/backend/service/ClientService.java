package com.example.backend.service;

import com.example.backend.dto.ClientDTO;
import com.example.backend.entity.Client;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.ClientRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EntityDTOMapper mapper;

    public List<ClientDTO> getAllClients() {
        return mapper.toClientDTOList(clientRepository.findAll());
    }

    public Optional<ClientDTO> getClientById(Integer id) {
        return clientRepository.findById(id).map(mapper::toClientDTO);
    }

    public Optional<ClientDTO> getClientByEmail(String email) {
        return clientRepository.findByMailClient(email).map(mapper::toClientDTO);
    }

    public ClientDTO saveClient(ClientDTO clientDTO) {
        Client client = mapper.toClientEntity(clientDTO);
        Client savedClient = clientRepository.save(client);
        return mapper.toClientDTO(savedClient);
    }

    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    public List<ClientDTO> searchClientsByName(String name) {
        return mapper.toClientDTOList(clientRepository.findByNomClientContainingIgnoreCase(name));
    }
}
