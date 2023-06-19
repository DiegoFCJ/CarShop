package com.contrader.carShop.controller;

import com.contrader.carShop.dto.*;
import com.contrader.carShop.service.FotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/foto")
public class FotoController{
    @Autowired
    private FotoService service;
    @GetMapping("/getAllByAutoId")
    public List<FotoDTO> getAllByAutoId (@RequestParam Long id) {
        return service.getAllByAutoId(id);
    }
    @GetMapping("/getFotoByUserId")
    public FotoDTO getFotoByUserId (@RequestParam Long id) {
        return service.getFotoByUserId(id);
    }
    @GetMapping ("/read")
    public FotoDTO read (@RequestParam("id") Long id) {
        FotoDTO fotoDTO = service.read(id);
        return fotoDTO;
    }
    @PutMapping ("/update")
    public FotoDTO update (@RequestBody FotoDTO dto) {
        service.update(dto);
        return dto;
    }

    @PostMapping ("/insert")
    public FotoDTO insert (@RequestBody FotoDTO dto) {
        service.insert(dto);
        return dto;
    }
    @DeleteMapping ("/delete")
    public void delete(@RequestParam long id) {
        service.delete(id);
    }
}