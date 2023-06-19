package com.contrader.carShop.controller;

import com.contrader.carShop.dto.AnagraficaDTO;
import com.contrader.carShop.service.AnagraficaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/anagrafica")
public class AnagraficaController {

    @Autowired
    private AnagraficaService anagraficaService;

    @GetMapping(value = "/findAnagraficaByUserId")
    public AnagraficaDTO findAnagraficaByUserId(@RequestParam("user_id") long user_id){
        return anagraficaService.findByUserId(user_id);
    }

    @GetMapping(value = "/read")
    public AnagraficaDTO read(@RequestParam("id") long id) {
        return anagraficaService.read(id);
    }

    @PostMapping(value = "/insert")
    public AnagraficaDTO insert(@RequestBody AnagraficaDTO anagraficaDTO){
        return anagraficaService.insert(anagraficaDTO);
    }

    @PutMapping(value = "/update")
    public AnagraficaDTO update(@RequestBody AnagraficaDTO anagraficaDTO){
        return anagraficaService.update(anagraficaDTO);
    }

    @DeleteMapping(value = "/delete")
    public void delete(@RequestParam long id){
        AnagraficaDTO dto = anagraficaService.read(id);
        dto.setUser(null);
        anagraficaService.update(dto);
    }
}