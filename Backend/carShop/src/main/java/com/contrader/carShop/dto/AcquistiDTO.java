package com.contrader.carShop.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.contrader.carShop.model.Auto;
import com.contrader.carShop.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class AcquistiDTO {

    private Long id;

    private Long idOrdine;
    private int quantita;

    private double prezzo;
    private boolean acquistato;

    private String dataAcquisto;
    private String orarioAcquisto;

    private User user;

    private Auto auto;

}
