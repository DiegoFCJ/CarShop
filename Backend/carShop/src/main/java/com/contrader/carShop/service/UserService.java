package com.contrader.carShop.service;

import com.contrader.carShop.dao.UserRepository;
import com.contrader.carShop.dto.UserDTO;
import com.contrader.carShop.mapper.UtenzaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
	private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(); //da implementare in WebSecurityConfig

	UtenzaMapper utenzaMapper = UtenzaMapper.INSTANCE;
	 @Autowired
	 UserRepository userRepository;

	public boolean doesEmailExists(String email){
		return userRepository.findByEmail(email).isPresent();
	}
	public List<UserDTO> getAll() {
		return utenzaMapper.mapToUserDTOList(userRepository.findAll());
	}


	public UserDTO read(long id) {
		return utenzaMapper.mapToUserDTO(userRepository.findById(id).get());
	}


	public UserDTO update(UserDTO dto) {
		String password = dto.getPassword();
		password = bcryptEncoder.encode(password);
		dto.setPassword(password);
		return utenzaMapper.mapToUserDTO(userRepository.save(utenzaMapper.mapToUser(dto)));
	}

//	public UserDTO insert(UserDTO userDTO) {
//		return utenzaMapper.mapToUserDTO(userRepository.save(utenzaMapper.mapToUser(userDTO)));
//	}
	public void delete(long id) {
		userRepository.deleteById(id);
	}
}