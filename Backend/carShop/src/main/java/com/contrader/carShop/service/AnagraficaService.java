package com.contrader.carShop.service;

import com.contrader.carShop.dao.AnagraficaRepository;
import com.contrader.carShop.dto.AnagraficaDTO;
import com.contrader.carShop.mapper.AnagraficaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnagraficaService {

    AnagraficaMapper anagraficaMapper = AnagraficaMapper.INSTANCE;

    @Autowired
    private AnagraficaRepository repository;

    public AnagraficaDTO findByUserId(Long user_id){
        return anagraficaMapper.mapToAnagraficaDTO(repository.findByUserId(user_id));
    }

    public AnagraficaDTO insert(AnagraficaDTO anagraficaDTO){
        return anagraficaMapper.mapToAnagraficaDTO(repository.save(anagraficaMapper.mapToAnagrafica(anagraficaDTO)));
    }

    public List<AnagraficaDTO> getAll() {
        return anagraficaMapper.mapToAnagraficaDTOList(repository.findAll());
    }

    public AnagraficaDTO read(long id) {
        return anagraficaMapper.mapToAnagraficaDTO(repository.findById(id).get());
    }

    public AnagraficaDTO update(AnagraficaDTO dto) {
        return anagraficaMapper.mapToAnagraficaDTO(repository.save(anagraficaMapper.mapToAnagrafica(dto)));
    }

    public void delete(long id) {
        repository.deleteById(id);
    }
}
