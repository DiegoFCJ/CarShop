package com.contrader.carShop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.contrader.carShop.model.User;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Acquisti {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_sequence", allocationSize = 1)
    private Long id;
    private Long idOrdine;
    private int quantita;
    private double prezzo;
    private boolean acquistato;

    private String dataAcquisto;
    private String orarioAcquisto;
    @ManyToOne
     @JoinColumn(name="user_Id",nullable=true)
    private User user;

    @ManyToOne
     @JoinColumn(name="auto_id")
    private Auto auto;
}