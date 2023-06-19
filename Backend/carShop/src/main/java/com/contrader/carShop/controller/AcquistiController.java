package com.contrader.carShop.controller;

import com.contrader.carShop.dao.AcquistiRepository;
import com.contrader.carShop.dto.AcquistiDTO;
import com.contrader.carShop.service.AcquistiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/acquisti")
public class AcquistiController {

    @Autowired
    AcquistiService acquistiService;
    @Autowired
    AcquistiRepository acquistiRepository;


    @GetMapping("/findAllByIDOrdine")
    public List<AcquistiDTO> findAllByIDOrdine (@RequestParam Long idOrdine) {
        return acquistiService.findAllByIDOrdine(idOrdine);
    }
    @GetMapping("/getAllByID")
    public List<AcquistiDTO> getAllByID(@RequestParam Long id) {
        return acquistiService.getAllByUserId(id);
    }

    @GetMapping("/getAllByUserId")
    public List<AcquistiDTO> getAllByUserId(@RequestParam Long id) {
        return acquistiService.getAllByUserId(id);
    }

    @GetMapping("/getAllByAcquistato")
    public List<AcquistiDTO> getAllByAcquistato() { return acquistiService.getAllByAcquistato(); }

    @GetMapping(value = "/read")
    public AcquistiDTO read(@RequestParam("id") long id) {
        return acquistiService.read(id);
    }

    @PostMapping("/insert")
    public AcquistiDTO insert(@RequestBody AcquistiDTO dto) {
        acquistiService.insert(dto);
        return dto;
    }

    @PutMapping("/update")
    public AcquistiDTO update(@RequestBody AcquistiDTO dto){
        return acquistiService.updateAuto(dto);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam long id){
        acquistiService.delete(id);
    }
}