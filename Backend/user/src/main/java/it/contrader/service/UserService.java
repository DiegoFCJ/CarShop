package it.contrader.service;

import it.contrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.contrader.dao.UserRepository;
import it.contrader.dto.UserDTO;
import it.contrader.mapper.UtenzaMapper;

import java.util.List;

@Service
public class UserService{
	
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
		return utenzaMapper.mapToUserDTO(userRepository.save(utenzaMapper.mapToUser(dto)));
	}


	public void delete(long id) {
		userRepository.deleteById(id);
	}
}