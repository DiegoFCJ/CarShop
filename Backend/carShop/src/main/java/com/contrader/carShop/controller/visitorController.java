package com.contrader.carShop.controller;

import com.contrader.carShop.dto.AutoDTO;
import com.contrader.carShop.service.AutoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/visitor")
public class visitorController {

    @Autowired
    private AutoService autoService;

    @GetMapping("/filters")
    public List<AutoDTO> filters(
            @RequestParam(value = "modello", required = false) String modello,
            @RequestParam(value = "costo", required = false) Double costo,
            @RequestParam(value = "anno", required = false) Integer anno){
        return autoService.filters(modello, costo, anno);
    }

    @GetMapping("/search")
    public List<AutoDTO> search(@RequestParam String modello){
        return autoService.search(modello);
    }

}
