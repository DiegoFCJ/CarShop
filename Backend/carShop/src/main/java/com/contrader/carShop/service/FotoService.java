package com.contrader.carShop.service;

import com.contrader.carShop.dao.FotoRepository;
import com.contrader.carShop.dto.FotoDTO;
import com.contrader.carShop.mapper.FotoMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import com.contrader.carShop.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FotoService {

    FotoMapper fotoMapper = Mappers.getMapper(FotoMapper.class);

    @Autowired
    FotoRepository fotoRepository;

    public List<FotoDTO> getAllByAutoId (Long autoId) {
        return fotoMapper.mapToFotoDTOList(fotoRepository.findFotoByAutoId(autoId));
    }

    public FotoDTO getFotoByUserId (Long userId) {
        return fotoMapper.mapToFotoDTO(fotoRepository.findFotoByUserId(userId));
    }
    public FotoDTO insert(FotoDTO fotoDTO) {
        return fotoMapper.mapToFotoDTO(fotoRepository.save(fotoMapper.mapToFoto(fotoDTO)));
    }
    public FotoDTO read(Long id) {
        return fotoMapper.mapToFotoDTO(fotoRepository.findById(id).get());
    }
    public FotoDTO update (FotoDTO fotoDTO) {
        fotoRepository.save(fotoMapper.mapToFoto(fotoDTO));
        return fotoDTO;
    }
    public void delete(Long id) {
        fotoRepository.deleteById(id);
    }
}
