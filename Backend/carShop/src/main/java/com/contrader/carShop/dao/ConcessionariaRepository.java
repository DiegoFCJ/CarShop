package com.contrader.carShop.dao;

import com.contrader.carShop.model.Concessionaria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ConcessionariaRepository extends CrudRepository<Concessionaria, Long> {

    @Query("Select c FROM Concessionaria c WHERE c.user.id = :user_id")
    Concessionaria findConcessionariaByUserId(@Param("user_id")Long user_id);
}
