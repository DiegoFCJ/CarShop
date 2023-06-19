package com.contrader.carShop.controller;

import com.contrader.carShop.dto.FotoDTO;
import com.contrader.carShop.mapper.AutoMapper;
import com.contrader.carShop.dao.AutoRepository;
import com.contrader.carShop.dto.AcquistiDTO;
import com.contrader.carShop.dto.AutoDTO;
import com.contrader.carShop.service.AcquistiService;
import com.contrader.carShop.service.AutoService;
import com.contrader.carShop.service.FotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/auto")
public class AutoController {
    @Autowired
    private AutoService autoService;
    @Autowired
    private AcquistiService acquistiService;
    @Autowired
    private AutoRepository autoRep;

    @Autowired
    private FotoService fotoService;

    AutoMapper autoMapper = AutoMapper.INSTANCE;

    @GetMapping("/getAll")
    public List<AutoDTO> getAll() {
        return autoService.getAll();
    }
    @GetMapping("/getAllAutoByID")
    public List<AutoDTO> getAllByID(@RequestParam("idUser") Long user_id) {
        return autoService.getAllById(user_id);
    }
    @GetMapping ("/read")
    public AutoDTO read (@RequestParam("id") Long id) {
        return autoService.read(id);
    }
    @GetMapping ("/readByCodice")
    public AutoDTO readByCodice (@RequestParam("codice") Long codice) {
        return autoService.readByCodice(codice);
    }
    @PutMapping ("/update")
    public AutoDTO update (@RequestBody AutoDTO dto) {
        autoService.updateAuto(dto);
        return dto;
    }

    @PostMapping ("/insert")
    public AutoDTO insert (@RequestBody AutoDTO dto) {
        autoService.insert(dto);
        return dto;
    }
    @DeleteMapping ("/delete")
    public void delete(@RequestParam long id) {

        try {

            /** prelevo i dati dell'auto da eliminare */
            AutoDTO dto = autoService.read(id);
            boolean venduta = false;


            List <FotoDTO> fotoDTOList = fotoService.getAllByAutoId(id);
            for(FotoDTO f : fotoDTOList) {
                f.setAuto(null);
                f.setUser(null);
                fotoService.delete(f.getId());
            }

            List<AcquistiDTO> listAcquistiDaEliminare = acquistiService.getAllByAutoId(dto.getId());
            if(listAcquistiDaEliminare != null){
                /** se l'auto e' stata acquistata da qualcuno, la conservo e setto a null lo user dell'auto */
                dto.setUser(null);
                dto.setQuantita(0);
                autoService.updateAuto(dto);
                /** se l'auto e' solo nel carrello viene eliminata la riga in Acquisti */
                for(AcquistiDTO e : listAcquistiDaEliminare){
                    if(!e.isAcquistato()){
                        acquistiService.delete(e.getId());
                    } else if(e.isAcquistato()){
                        venduta = true;
                    }

                }
            } else {
                /** se l'auto non e' mai stata acquistata la elimino */
                autoService.delete(id);
            }
            if (venduta == false){
                autoService.delete(id);
            }
        } catch (Exception e) {
            System.out.println("Errore: "+e); //ERRORE CHE GENERA
        }
    }
}