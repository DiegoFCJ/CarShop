package com.contrader.carShop.controller;

import com.contrader.carShop.dto.ConcessionariaDTO;
import com.contrader.carShop.service.ConcessionariaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/concessionaria")
public class ConcessionariaController {

    @Autowired
    private ConcessionariaService concessionariaService;

    @GetMapping(value = "/findConcessionariaByUserId")
    public ConcessionariaDTO findConcessionariaByUserId(Long id){
        return concessionariaService.findConcessionariaByUserId(id);
    }

    @GetMapping(value = "/read")
    public ConcessionariaDTO read(@RequestParam long id) {return concessionariaService.read(id);}

    @PostMapping(value = "/insert")
    public ConcessionariaDTO insert(@RequestBody ConcessionariaDTO concessionariaDTO){return concessionariaService.insert(concessionariaDTO);}

    @PutMapping(value = "/update")
    public ConcessionariaDTO update(@RequestBody ConcessionariaDTO concessionariaDTO){return concessionariaService.update(concessionariaDTO);}

    @DeleteMapping(value = "/delete")
    public void delete(@RequestParam long id) {
        concessionariaService.delete(id);
    }
}