package com.contrader.carShop.config;


import com.contrader.carShop.dao.UserRepository;
import com.contrader.carShop.dto.UserDTO;
import com.contrader.carShop.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    private PasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(); //da implementare in WebSecurityConfig

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userDao.findByEmail(email).get();

        if (userDao.findByEmail(email).isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
//                new ArrayList<>());
        return new CustomUserDetails(user);
    }

    public User save(UserDTO user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setUsertype(user.getUsertype());
        return userDao.save(newUser);
    }
}