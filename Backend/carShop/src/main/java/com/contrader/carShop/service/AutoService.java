package com.contrader.carShop.service;

import com.contrader.carShop.dao.AutoRepository;
import com.contrader.carShop.dto.AutoDTO;
import com.contrader.carShop.mapper.AutoMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AutoService {

    AutoMapper autoMapper = Mappers.getMapper(AutoMapper.class);

    @Autowired
    AutoRepository autoRepository;

    public List<AutoDTO> filters(String modello, Double costo, Integer anno){
        List<AutoDTO> autoFiltered = getAll();
        if(modello != null)
            autoFiltered = autoFiltered.stream().filter(autoDTO -> autoDTO.getModello().toLowerCase().contains(modello.toLowerCase())).collect(Collectors.toList());
        if(costo != null)
            autoFiltered = autoFiltered.stream().filter(autoDTO -> autoDTO.getPrezzo() <= costo).collect(Collectors.toList());
        if(anno != null)
            autoFiltered = autoFiltered.stream().filter(autoDTO -> autoDTO.getAnno() == anno).collect(Collectors.toList());
        return autoFiltered;
    }


        public List<AutoDTO> search(String modello) {
        return autoMapper.mapToAutoDTOList(autoRepository.findAll())
                .stream()
                .filter(autos -> autos.getModello().toLowerCase().contains(modello.toLowerCase()))
                .collect(Collectors.toList());
    }


    public List<AutoDTO> getAllById(Long userId)
    {
        return autoMapper.mapToAutoDTOList(autoRepository.findAll())
                .stream()
                .filter(autos -> autos.getUser().getId() == userId)
                .collect(Collectors.toList());
    }

    public List<AutoDTO> getAll()
    {
        return autoMapper.mapToAutoDTOList(autoRepository.findAll());
    }

    public AutoDTO readByCodice(Long codice)
    {
        return  autoMapper.mapToAutoDTO(autoRepository.findByCodice(codice));
    }

    public AutoDTO read(long id)
    {
        return  autoMapper.mapToAutoDTO(autoRepository.findById(id).get());
    }


    public AutoDTO insert(AutoDTO autoDTO) {
        return autoMapper.mapToAutoDTO(autoRepository.save(autoMapper.mapToAuto(autoDTO)));
    }

    public void updateAuto(AutoDTO autoDTO) {
        autoRepository.save(autoMapper.mapToAuto(autoDTO));
    }

    public void delete(long id) { autoRepository.deleteById(id);}
}
