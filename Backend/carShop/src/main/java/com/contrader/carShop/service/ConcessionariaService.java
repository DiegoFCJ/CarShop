package com.contrader.carShop.service;

import com.contrader.carShop.dao.ConcessionariaRepository;
import com.contrader.carShop.dto.ConcessionariaDTO;
import com.contrader.carShop.mapper.ConcessionariaMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConcessionariaService {

    ConcessionariaMapper concessionariaMapper = Mappers.getMapper(ConcessionariaMapper.class);

    @Autowired
    ConcessionariaRepository repository;

    public ConcessionariaDTO findConcessionariaByUserId(Long user_id) {
        return concessionariaMapper.mapToConcessionariaDTO(repository.findConcessionariaByUserId(user_id));
    }
    public ConcessionariaDTO insert (ConcessionariaDTO dto) {
        return concessionariaMapper.mapToConcessionariaDTO(repository.save(concessionariaMapper.mapToConcessionaria(dto)));
    }
    public ConcessionariaDTO read (long id){
        return  concessionariaMapper.mapToConcessionariaDTO(repository.findById(id).get());
    }
    public void delete (long id){
        repository.deleteById(id);
    }
    public ConcessionariaDTO update (ConcessionariaDTO dto) {
        return concessionariaMapper.mapToConcessionariaDTO(repository.save(concessionariaMapper.mapToConcessionaria(dto)));
    }
}
