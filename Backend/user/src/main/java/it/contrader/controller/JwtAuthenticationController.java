package it.contrader.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import it.contrader.config.JwtTokenUtil;
import it.contrader.dto.UserDTO;
import it.contrader.model.JwtRequest;
import it.contrader.model.JwtResponse;
import it.contrader.service.JwtUserDetailsService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager; //creiamo il bean in WebSecurityConfig

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        ObjectMapper mapper = new ObjectMapper();

        final CustomUserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        String id = Long.toString(userDetails.getId());
        String email = userDetails.getUsername();
        String password = userDetails.getPassword();
        String usertype = userDetails.getUsertype().toString();


        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, id, email, password, usertype));
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        try {
            return ResponseEntity.ok(userDetailsService.save(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Errore durante l'inserimento dell'utente: " + e.getMessage());
        }
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}