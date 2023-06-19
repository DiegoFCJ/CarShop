package com.contrader.carShop.dao;

import com.contrader.carShop.model.Auto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

@Repository
@Transactional
public interface AutoRepository extends CrudRepository<Auto, Long> {

    @Query("SELECT a FROM Auto a WHERE a.codice = :codice")
    Auto findByCodice(@Param("codice") Long codice);

}