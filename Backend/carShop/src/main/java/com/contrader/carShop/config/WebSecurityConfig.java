package com.contrader.carShop.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;


    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;


    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.csrf().disable()
                // dont authenticate this particular request
                .authorizeRequests()

                //permit all
                .antMatchers("/visitor/**").permitAll()

                //acquisti
                .antMatchers("/acquisti/findAllByIDOrdine").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/getAllByID").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/getAllByUserId").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/findAllByIDOrdine").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/getAllByAcquistato").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/read").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/insert").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/update").hasAnyAuthority("USER", "ADMIN")
                .antMatchers("/acquisti/delete").hasAnyAuthority("USER", "ADMIN")

                //anagrafica
                .antMatchers("/anagrafica/findAnagraficaByUserId").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/anagrafica/read").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/anagrafica/insert").permitAll()
                .antMatchers("/anagrafica/update").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/anagrafica/delete").hasAnyAuthority("USER","ADMIN")

                //auto
                .antMatchers("/auto/getAll").permitAll()
                .antMatchers("/auto/getAllAutoByID").permitAll()
                .antMatchers("/auto/read").permitAll()
                .antMatchers("/auto/readByCodice").permitAll()
                .antMatchers("/auto/update").hasAuthority("ADMIN")
                .antMatchers("/auto/insert").hasAuthority("ADMIN")
                .antMatchers("/auto/delete").hasAuthority("ADMIN")

                //concessionaria
                .antMatchers("/concessionaria/findConcessionariaByUserId").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/concessionaria/read").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/concessionaria/insert").permitAll()
                .antMatchers("/concessionaria/update").hasAnyAuthority("ADMIN")

                //foto
                .antMatchers("/foto/getAllByAutoId").permitAll()
                .antMatchers("/foto/getFotoByUserId").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/foto/read").permitAll()
                .antMatchers("/foto/update").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/foto/insert").permitAll()
                .antMatchers("/foto/delete").hasAnyAuthority("USER","ADMIN")

                //user
                .antMatchers("/userController/doesEmailExists").permitAll()
                .antMatchers("/userController/read").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/userController/update").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/userController/getAll").hasAnyAuthority("USER","ADMIN")
                .antMatchers("/userController/delete").hasAnyAuthority("USER","ADMIN")
//                .antMatchers("/userController/deleteUser").hasAnyAuthority("USER","ADMIN")

                // all other requests need to be authenticated
                .anyRequest().authenticated().and()
                // make sure we use stateless session; session won't be used to
                // store user's state.
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}