package it.contrader.model;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


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
