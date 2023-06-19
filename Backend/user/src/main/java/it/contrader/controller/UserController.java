//package it.contrader.controller;
//
//import it.contrader.dto.UserDTO;
//import it.contrader.service.UserService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.util.List;
//
//
//@Slf4j
//@RestController
//public class UserController {
//
//
//    @Autowired
//    private UserService userService;
//
//    public String home() throws IOException, InterruptedException {
//        return "<h2>MICROSERVIZIO 1, ID ISTANZA: " + printHostname() + "</h2>";
//    }
//
//    public static String printHostname() throws IOException, InterruptedException {
//        String cmd = "hostname";
//        Runtime run = Runtime.getRuntime();
//        Process pr = run.exec(cmd);
//        pr.waitFor();
//        BufferedReader buf = new BufferedReader(new InputStreamReader(pr.getInputStream()));
//        String line = "";
//        line = buf.readLine();
//        return line;
//    }
//
//    @GetMapping("/doesEmailExists")
//    public boolean doesEmailExists(@RequestParam String email){
//        return userService.doesEmailExists(email);
//    }
//
//    @GetMapping(value = "/getAll")
//    public List<UserDTO> getAll(){ return (List<UserDTO>) userService.getAll(); }
//
//    @GetMapping(value = "/read")
//    public UserDTO read(@RequestParam long id) {
//        return userService.read(id);
//    }
//
//    @PutMapping(value = "/update")
//    public UserDTO update(@RequestBody UserDTO userDTO){
//        return userService.update(userDTO);
//    }
///*
//    @DeleteMapping(value = "/delete")
//    public void delete(@RequestParam long id){
//        try {
//            AnagraficaDTO dto = anagraficaService.findAnagraficaByUserId(id);
//            if (dto != null) {
//                dto.setUser(null);
//                anagraficaService.update(dto);
//            }
//
////			NON SERVE PERCHE' C'E' DELETE CASCADE IN CONCESSIONARIA
////			ConcessionariaDTO cDTO = concessionariaService.findConcessionariaByUserId(id);
////			if(cDTO != null)
////				concessionariaService.delete(cDTO.getId());
//
//            // prelevo tutte le auto dell'admin
//            List<AutoDTO> listAuto = autoService.getAllById(id);
//            for(AutoDTO a : listAuto){
//                List<AcquistiDTO> listAcquistiDaEliminare = acquistiService.getAllByAutoId(a.getId());
//                if(listAcquistiDaEliminare != null){
//                    // se l'auto e' stata acquistata da qualcuno, la conservo e setto a null lo user dell'auto
//                    a.setUser(null);
//                    a.setQuantita(0);
//                    autoService.update(a);
//                    // se l'auto e' solo nel carrello viene eliminata la riga in Acquisti
//                    for(AcquistiDTO e : listAcquistiDaEliminare){
//                        if(!e.isAcquistato()){
//                            acquistiService.delete(e.getId());
//                        }
//                    }
//                } else {
//                    // se l'auto non e' mai stata acquistata la elimino
//                    autoService.delete(a.getId());
//                }
//            }
//
//            // setto a null il parametro "user" a tutti gli acquisti dello user che verra' eliminato
//            List<AcquistiDTO> listAcquisti = acquistiService.getAllByUserId(id);
//            for(AcquistiDTO a : listAcquisti){
//                a.setUser(null);
//                acquistiService.update(a);
//            }
//
//            userService.delete(id);
//        } catch (Exception e) {
//            System.out.println("Errore: "+e); //ERRORE CHE GENERA
//        }
//    }*/
//}
//
//
