package com.contrader.carShop.service;

import com.contrader.carShop.mapper.AcquistiMapper;
import com.contrader.carShop.dao.AcquistiRepository;
import com.contrader.carShop.dto.AcquistiDTO;
import com.contrader.carShop.mapper.AnagraficaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcquistiService {

    AcquistiMapper acquistiMapper = AcquistiMapper.INSTANCE;

    @Autowired
    AcquistiRepository acquistiRepository;

    public List<AcquistiDTO> findAllByIDOrdine (Long idOrdine) {
//        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAllByIDOrdine(idOrdine));
        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAll())
                .stream()
                .filter(acquistiAll -> acquistiAll.getIdOrdine() == idOrdine).collect(Collectors.toList());
    }
    public List<AcquistiDTO> getAllByAutoId(Long autoId){
        //return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findByAutoId(autoId));
        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAll())
                .stream()
                .filter(acquistiAll -> acquistiAll.getAuto().getId() == autoId).collect(Collectors.toList());
    }
    public List<AcquistiDTO> getAllByUserId(Long userId) {
       // return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findByUserId(userId));
        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAll())
                .stream()
                .filter(acquistiAll -> acquistiAll.getUser().getId() == userId).collect(Collectors.toList());
    }
    public List<AcquistiDTO> getAllByAcquistato() {
//        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAllByAcquistato());
        return acquistiMapper.mapToAcquistiDTOList(acquistiRepository.findAll())
                .stream()
                .filter(acquistiAll -> acquistiAll.isAcquistato() == true).collect(Collectors.toList());
    }
    public AcquistiDTO read(long id) {
        return acquistiMapper.mapToAcquistiDTO(acquistiRepository.findById(id).get());
    }
    public AcquistiDTO insert(AcquistiDTO acquistiDTO) {
        return acquistiMapper.mapToAcquistiDTO(acquistiRepository.save(acquistiMapper.mapToAcquisti(acquistiDTO)));
    }
    public AcquistiDTO updateAuto(AcquistiDTO acquistiDTO) {
        return acquistiMapper.mapToAcquistiDTO(acquistiRepository.save(acquistiMapper.mapToAcquisti(acquistiDTO)));
    }
    public void delete(long id) {
        acquistiRepository.deleteById(id);
    }
}