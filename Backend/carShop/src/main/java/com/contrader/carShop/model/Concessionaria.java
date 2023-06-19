package com.contrader.carShop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;

import com.contrader.carShop.model.User;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Concessionaria
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descrizione;
    private String provincia;
    private String citta;
    private String indirizzo;
    private String nazione;

    @OneToOne(cascade = CascadeType.REMOVE)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="user_Id", nullable=true)
    private User user;
}
