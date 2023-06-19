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
public class Foto {
    @Id
    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_sequence", allocationSize = 1)
    private Long id;
    private String url;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Auto auto;

    @OneToOne(cascade = CascadeType.REMOVE)
    private User user;
}