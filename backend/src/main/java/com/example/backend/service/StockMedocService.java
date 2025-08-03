package com.example.backend.service;

import com.example.backend.dto.StockMedocDTO;
import com.example.backend.entity.StockMedoc;
import com.example.backend.entity.StockMedocId;
import com.example.backend.mapper.EntityDTOMapper;
import com.example.backend.repository.StockMedocRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class StockMedocService {

    @Autowired
    private StockMedocRepository stockMedocRepository;

    @Autowired
    private EntityDTOMapper mapper;

    public List<StockMedocDTO> getAllStocks() {
        return mapper.toStockMedocDTOList(stockMedocRepository.findAll());
    }

    public List<StockMedocDTO> getStockByPharmacie(Integer idPharmacie) {
        return mapper.toStockMedocDTOList(stockMedocRepository.findByIdPharmacie(idPharmacie));
    }

    public List<StockMedocDTO> getStockByMedicament(String nomMedoc) {
        return mapper.toStockMedocDTOList(stockMedocRepository.findByNomMedoc(nomMedoc));
    }

    public StockMedocDTO saveStock(StockMedocDTO stockDTO) {
        StockMedoc stock = mapper.toStockMedocEntity(stockDTO);
        StockMedoc savedStock = stockMedocRepository.save(stock);
        return mapper.toStockMedocDTO(savedStock);
    }

    public void deleteStock(Integer idPharmacie, String nomMedoc) {
        StockMedocId id = new StockMedocId(idPharmacie, nomMedoc);
        stockMedocRepository.deleteById(id);
    }

    public List<StockMedocDTO> getAvailableStock(Integer idPharmacie) {
        return mapper.toStockMedocDTOList(stockMedocRepository.findAvailableStockByPharmacie(idPharmacie));
    }
}
