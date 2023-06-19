package com.contrader.carShop.dao;

import com.contrader.carShop.model.Acquisti;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface AcquistiRepository extends CrudRepository<Acquisti, Long> {

//    @Query("SELECT a FROM Acquisti a WHERE a.user.id = :id")
//    List<Acquisti> findByUserId(@Param("id") Long userId);

//    @Query("SELECT a FROM Acquisti a WHERE a.auto.id = :id")
//    List<Acquisti> findByAutoId(@Param("id") Long id);

//    @Query("SELECT a FROM Acquisti a WHERE a.acquistato = true")
//    List<Acquisti> findAllByAcquistato();

    @Query("SELECT a FROM Acquisti a WHERE a.idOrdine =:idOrdine")
    List<Acquisti> findAllByIDOrdine(@Param("idOrdine") Long idOrdine);
}