package com.contrader.carShop.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.contrader.carShop.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class AnagraficaDTO {

    private Long id;

    private String nome;

    private String cognome;

    private String genere;

    private String nazione;

    private String provincia;

    private String cittaResidenza;

    private String indirizzo;

    private String dataNascita;

    private User user;
}