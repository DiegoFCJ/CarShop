package com.contrader.carShop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;

import com.contrader.carShop.model.User;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Auto {

    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_sequence", allocationSize = 1)
    private Long id;
    private int anno;
    private Long codice;
    private String modello;
    private double prezzo;
    private int quantita;

    @Column(columnDefinition = "VARCHAR(700)")
    private String descrizione;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="user_Id", nullable=true)
    private User user;
}