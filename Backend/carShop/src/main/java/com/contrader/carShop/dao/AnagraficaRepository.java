package com.contrader.carShop.dao;

import com.contrader.carShop.model.Anagrafica;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AnagraficaRepository extends CrudRepository<Anagrafica, Long> {

    @Query(value = "SELECT * FROM anagrafica  WHERE user_id = :user_id", nativeQuery = true)
    Anagrafica findByUserId(Long user_id);
}