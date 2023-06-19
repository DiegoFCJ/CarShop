package com.contrader.carShop.dao;

import com.contrader.carShop.model.Foto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface FotoRepository extends CrudRepository<Foto, Long> {
    @Query(value = "SELECT * FROM foto WHERE user_id = :user_id", nativeQuery = true)
    Foto findFotoByUserId(Long user_id);

    @Query(value = "SELECT * FROM foto WHERE auto_id = :auto_id", nativeQuery = true)
    List<Foto> findFotoByAutoId(Long auto_id);
}
