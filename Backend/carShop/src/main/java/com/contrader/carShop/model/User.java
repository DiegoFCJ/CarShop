package com.contrader.carShop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {

	public enum UsertypeEnum {
		ADMIN,
		USER
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@SequenceGenerator(name = "customer_seq", sequenceName = "customer_sequence", allocationSize = 1)
	private Long id;

	@Column(unique = true)
	private String email;
	private String password;

	private UsertypeEnum usertype;
	
}
