package com.contrader.carShop.model;

import com.contrader.carShop.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Anagrafica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cognome;
    private String genere;
    private String nazione;
    private String provincia;
    private String cittaResidenza;
    private String indirizzo;

    private String dataNascita;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="user_id", nullable=true)
    private User user;
}