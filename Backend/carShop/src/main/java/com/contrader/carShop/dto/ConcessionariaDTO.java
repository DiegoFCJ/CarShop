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
public class ConcessionariaDTO {

    private Long id;

    private String nome;

    private String descrizione;

    private String provincia;

    private String citta;

    private String indirizzo;

    private String nazione;

    private User user;
}
